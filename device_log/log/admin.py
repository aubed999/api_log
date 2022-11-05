from django.contrib import admin
from .models import Devices, ConvertedDevices,DevicePayment,Upload

admin.site.register(Devices)
admin.site.register(ConvertedDevices)
admin.site.register(DevicePayment)
admin.site.register(Upload)

# Register your models here.
