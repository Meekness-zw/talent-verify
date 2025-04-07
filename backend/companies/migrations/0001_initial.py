# Generated by Django 5.2 on 2025-04-07 08:14

import django.core.validators
import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('registration_number', models.CharField(max_length=100)),
                ('date_of_registration', models.DateField()),
                ('address', models.TextField()),
                ('contact_person', models.CharField(max_length=255)),
                ('contact_phone', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=254)),
                ('total_employees', models.PositiveIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='company', to=settings.AUTH_USER_MODEL)),
                ('departments', models.ManyToManyField(blank=True, to='companies.department')),
            ],
            options={
                'verbose_name_plural': 'Companies',
            },
        ),
    ]
