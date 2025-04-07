import pandas as pd
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Employee, EmploymentHistory, EmployeeRole
from .serializers import (EmployeeSerializer, EmploymentHistorySerializer, 
                         EmployeeRoleSerializer, BulkEmployeeUploadSerializer)
from companies.models import Company
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from datetime import datetime

class EmployeeRoleListView(generics.ListCreateAPIView):
    queryset = EmployeeRole.objects.all()
    serializer_class = EmployeeRoleSerializer
    permission_classes = [permissions.IsAuthenticated]

class EmployeeRoleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeeRole.objects.all()
    serializer_class = EmployeeRoleSerializer
    permission_classes = [permissions.IsAuthenticated]

class EmployeeListView(generics.ListCreateAPIView):
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['company', 'company__name']
    search_fields = ['first_name', 'last_name', 'employee_id']

    def get_queryset(self):
        user = self.request.user
        if user.is_talent_verify_staff:
            return Employee.objects.all()
        elif user.is_employer:
            return Employee.objects.filter(company__user=user)
        return Employee.objects.none()

class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_talent_verify_staff:
            return Employee.objects.all()
        elif user.is_employer:
            return Employee.objects.filter(company__user=user)
        return Employee.objects.none()

class EmploymentHistoryListView(generics.ListCreateAPIView):
    serializer_class = EmploymentHistorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['employee', 'department', 'role', 'is_current']

    def get_queryset(self):
        user = self.request.user
        if user.is_talent_verify_staff:
            return EmploymentHistory.objects.all()
        elif user.is_employer:
            return EmploymentHistory.objects.filter(employee__company__user=user)
        return EmploymentHistory.objects.none()

class EmploymentHistoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EmploymentHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_talent_verify_staff:
            return EmploymentHistory.objects.all()
        elif user.is_employer:
            return EmploymentHistory.objects.filter(employee__company__user=user)
        return EmploymentHistory.objects.none()

class BulkEmployeeUploadView(generics.CreateAPIView):
    serializer_class = BulkEmployeeUploadSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        file = serializer.validated_data['file']
        user = request.user
        
        if not user.is_employer and not user.is_talent_verify_staff:
            return Response(
                {"error": "You don't have permission to upload employees."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        try:
            if file.name.endswith('.csv'):
                df = pd.read_csv(file)
            else:  # Excel file
                df = pd.read_excel(file)
            
            required_columns = {'first_name', 'last_name'}
            if not required_columns.issubset(df.columns):
                missing = required_columns - set(df.columns)
                return Response(
                    {"error": f"Missing required columns: {', '.join(missing)}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Get company for employer
            if user.is_employer:
                company = get_object_or_404(Company, user=user)
            else:
                if 'company_id' not in df.columns:
                    return Response(
                        {"error": "company_id column is required for Talent Verify staff"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                company_ids = df['company_id'].unique()
                if len(company_ids) > 1:
                    return Response(
                        {"error": "All employees in a single upload must belong to the same company"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                company = get_object_or_404(Company, id=company_ids[0])
            
            employees = []
            for _, row in df.iterrows():
                employee_data = {
                    'company': company.id,
                    'first_name': row['first_name'],
                    'last_name': row['last_name'],
                    'employee_id': row.get('employee_id'),
                    'email': row.get('email'),
                    'phone': row.get('phone'),
                }
                employee_serializer = EmployeeSerializer(data=employee_data)
                if employee_serializer.is_valid():
                    employee = employee_serializer.save()
                    employees.append(employee)
                    
                    # Create employment history if data is provided
                    if 'department' in row and 'role' in row and 'start_date' in row:
                        department = Department.objects.filter(name=row['department']).first()
                        role = EmployeeRole.objects.filter(name=row['role']).first()
                        
                        if department and role:
                            try:
                                start_date = datetime.strptime(row['start_date'], '%Y-%m-%d').date()
                                end_date = datetime.strptime(row['end_date'], '%Y-%m-%d').date() if 'end_date' in row else None
                                
                                EmploymentHistory.objects.create(
                                    employee=employee,
                                    department=department,
                                    role=role,
                                    start_date=start_date,
                                    end_date=end_date,
                                    duties=row.get('duties', ''),
                                    is_current=row.get('is_current', False)
                                )
                            except ValueError as e:
                                continue
            
            return Response(
                {"message": f"Successfully created {len(employees)} employees"},
                status=status.HTTP_201_CREATED
            )
        
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

# Create your views here.
