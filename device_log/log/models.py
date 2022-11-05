from unittest import mock
from xmlrpc.client import DateTime
from django.db import models


def upload_to(instance, filename):
    return 'updates/{filename}'.format(filename=filename)
class Devices(models.Model):
    device_ID = models.IntegerField(blank=False, primary_key=True)
    MAC = models.CharField(blank=True, max_length=17)
    POS = models.IntegerField(blank=False)
    PRINTER = models.IntegerField(blank=False)
    CUTTER = models.IntegerField(blank=False)
    API = models.IntegerField(blank=False)
    NUMBER = models.IntegerField(blank=True)
    DateTime = models.DateTimeField(auto_now=True)
    lastUpdate = models.DateTimeField(blank=True, null=True)
    UpdateVersion = models.IntegerField(blank=False)

class ConvertedDevices(models.Model):
    device_ID = models.IntegerField(blank=False, primary_key=True)
    MAC = models.CharField(blank=True, max_length=17)
    POS = models.CharField(blank=True, max_length=17)
    PRINTER = models.CharField(blank=True, max_length=17)
    CUTTER = models.CharField(blank=True, max_length=17)
    API = models.IntegerField(blank=False)
    NUMBER = models.IntegerField(blank=True)
    DateTime = models.CharField(blank=True, max_length=17)
    lastUpdate = models.CharField(blank=True, max_length=17)
    status = models.CharField(blank=True, max_length=1, null=True)

class DeviceTransaction(models.Model):
    device_ID = models.IntegerField(blank=False, primary_key=True)
    MAC = models.CharField(blank=True, max_length=17)
    POS = models.CharField(blank=True, max_length=17)
    PRINTER = models.CharField(blank=True, max_length=17)
    CUTTER = models.CharField(blank=True, max_length=17)
    API = models.IntegerField(blank=False)
    NUMBER = models.IntegerField(blank=True)
    PAYMENT = models.JSONField()
    DATETIME = models.DateTimeField(auto_now=True)
    lastUpdate = models.DateTimeField(blank=True, null=True)


class DevicePayment(models.Model):

    device_ID = models.ForeignKey(Devices,on_delete=models.CASCADE)
    CODE = models.IntegerField(blank=True)
    REF = models.CharField(blank=True, max_length=10,primary_key=True)
    PRICE = models.IntegerField(blank=True)
    DATETIME = models.CharField(blank=True, max_length=20)

    
class Upload(models.Model):
    # file will be saved to MEDIA_ROOT/uploads/2015/01/30
    file = models.FileField(upload_to=upload_to,blank=False, null=False)
    filename = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)

    


