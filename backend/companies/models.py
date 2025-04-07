from django.db import models
from django.utils.translation import gettext_lazy as _
from accounts.models import CustomUser
import uuid
from django.core.validators import MinValueValidator
from django.db import models

class Department(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Company(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='company')
    name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=100)
    date_of_registration = models.DateField()
    address = models.TextField()
    contact_person = models.CharField(max_length=255)
    contact_phone = models.CharField(max_length=20)
    email = models.EmailField()
    departments = models.ManyToManyField(Department, blank=True)
    total_employees = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Companies"

# Create your models here.
