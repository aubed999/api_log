from datetime import datetime
from xmlrpc.client import DateTime
from django.forms import ModelForm
from log.models import Devices, ConvertedDevices, Upload,DeviceTransaction,DevicePayment
from rest_framework import serializers
from django import forms
import jdatetime
from rest_framework.serializers import Serializer, FileField

# Serializers define the API representation.from django import forms

class FileSerializer(serializers.Serializer):
    file = serializers.FileField(max_length=None)

    
class UploadSerializer(serializers.ModelSerializer):

    class Meta:
        model= Upload
        fields = ['file']

    def create(self, validated_data):
        file = validated_data['file']
        print(file)
        return Upload.objects.create(file = file, filename=file)
class Devicesserializer(serializers.ModelSerializer):
    class Meta:
        model = Devices
        fields = ['device_ID', 'MAC','POS', 'PRINTER', 'CUTTER', 'API', 'NUMBER','UpdateVersion']

    def create(self, validated_data):
        flag = '0'
        device_ID=validated_data['device_ID']
        print(device_ID)
        MAC=validated_data['MAC']
        if validated_data['POS'] == 1  :
            POS = 'خراب'
            flag = '1'
            print(POS)
        else :
            POS = 'درست'
        if validated_data['PRINTER'] == 1:
            PRINTER = 'خراب'
            flag = '1'
        else :
            PRINTER = 'درست'
        if validated_data['CUTTER'] == 1:
            CUTTER='خراب'
            flag = '1'    
        else:
            CUTTER='درست' 
        API=validated_data['API']
        NUMBER=validated_data['NUMBER']       
        time = datetime.now()
        y = time.strftime("%Y")
        m = time.strftime("%m")
        d = time.strftime("%d")
        h = time.strftime("%H")
        M = time.strftime("%M")
        c = str(jdatetime.date.fromgregorian(day = int(d), month = int(m), year = int(y)))
        c = c +" " + h +" - " + M
        ConvertedDevices.objects.create(
            device_ID = device_ID, MAC = MAC, POS = POS, PRINTER = PRINTER,
            CUTTER = CUTTER, API = API, NUMBER = NUMBER,DateTime = c, status = flag
        )
        return Devices.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.device_ID = validated_data.get('device_ID', instance.device_ID)
        instance.MAC = validated_data.get('MAC', instance.MAC)
        instance.POS = validated_data.get('POS', instance.POS)
        instance.PRINTER = validated_data.get('PRINTER', instance.PRINTER)
        instance.CUTTER = validated_data.get('CUTTER', instance.CUTTER)
        instance.API = validated_data.get('API', instance.API)
        instance.NUMBER = validated_data.get('NUMBER', instance.NUMBER)
        instance.UpdateVersion = validated_data.get('UpdateVersion', instance.UpdateVersion)
        instance.lastUpdate = datetime.now()
        try:
            device = ConvertedDevices.objects.get(device_ID = validated_data.get('device_ID', instance.device_ID))
        except:
            device = 0
            print('converted device not found')
        flag = '0'
        if instance.POS == 1:
            device.POS = 'خراب'
            flag = '1'
        else:
            device.POS = 'درست'
        if instance.PRINTER == 1:
            device.PRINTER = 'خراب'
            flag = '1'
        else:
            device.PRINTER = 'درست'
        if instance.CUTTER == 1:
            device.CUTTER = 'خراب'
            flag = '1'
        else:
            device.CUTTER = 'درست'

        time = datetime.now()
        y = time.strftime("%Y")
        m = time.strftime("%m")
        d = time.strftime("%d")
        h = time.strftime("%H")
        M = time.strftime("%M")
        c = str(jdatetime.date.fromgregorian(day = int(d), month = int(m), year = int(y)))
        c = c +" " + h +" - " + M
        device.lastUpdate = c
        device.status = flag
        device.save()
        instance.save()

        return instance

class DeviceTransactionSelializer(serializers.ModelSerializer):
    class Meta:
        model = DevicePayment
        fields = ['CODE', 'REF', 'PRICE', 'DATETIME']

    def create(self, validated_data, device):
        print(validated_data['PAYMENT'])
        return DeviceTransaction.objects.create(
            device_ID = validated_data['device_ID'], CODE = validated_data['CODE'] ,REF = validated_data['REF'],
            DATETIME = validated_data['DATETIME']
        )

