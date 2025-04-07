from django.urls import path
from rest_framework.routers import DefaultRouter
from accounts.views import RegisterView, CustomTokenObtainPairView, UserProfileView
from companies.views import (CompanyListView, CompanyDetailView, CompanyCreateView, 
                           DepartmentListView, DepartmentDetailView)
from employees.views import (EmployeeListView, EmployeeDetailView, 
                           EmploymentHistoryListView, EmploymentHistoryDetailView,
                           EmployeeRoleListView, EmployeeRoleDetailView,
                           BulkEmployeeUploadView)

router = DefaultRouter()

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    
    # Company URLs
    path('companies/', CompanyListView.as_view(), name='company-list'),
    path('companies/create/', CompanyCreateView.as_view(), name='company-create'),
    path('companies/<uuid:pk>/', CompanyDetailView.as_view(), name='company-detail'),
    
    # Department URLs
    path('departments/', DepartmentListView.as_view(), name='department-list'),
    path('departments/<uuid:pk>/', DepartmentDetailView.as_view(), name='department-detail'),
    
    # Employee URLs
    path('employees/', EmployeeListView.as_view(), name='employee-list'),
    path('employees/<uuid:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),
    path('employees/bulk-upload/', BulkEmployeeUploadView.as_view(), name='employee-bulk-upload'),
    
    # Employment History URLs
    path('employment-history/', EmploymentHistoryListView.as_view(), name='employment-history-list'),
    path('employment-history/<uuid:pk>/', EmploymentHistoryDetailView.as_view(), name='employment-history-detail'),
    
    # Employee Role URLs
    path('employee-roles/', EmployeeRoleListView.as_view(), name='employee-role-list'),
    path('employee-roles/<uuid:pk>/', EmployeeRoleDetailView.as_view(), name='employee-role-detail'),
]

urlpatterns += router.urls