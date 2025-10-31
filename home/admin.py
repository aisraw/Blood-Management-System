from django.contrib import admin
from .models import Donor, People, Appointment

# # Register your models here.

admin.site.register(Donor)
admin.site.register(People)
admin.site.register(Appointment)