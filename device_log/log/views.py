from turtle import update
from urllib import response
from django.http import Http404, HttpResponse
from django.shortcuts import redirect, render
from json import loads
from django.utils import timezone
from .models import DeviceTransaction, Devices, ConvertedDevices, DevicePayment, Upload
from .serializers import DeviceTransactionSelializer, Devicesserializer, UploadSerializer, FileSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from datetime import datetime
import logging
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from django.http import HttpResponse
from wsgiref.util import FileWrapper
import jdatetime
# Create a logger for this file
logger = logging.getLogger(__file__)

def some_view(request):
    """
    Example view showing all the ways you can log messages.
    """
    logger.debug("This logs a debug message.")
    logger.info("This logs an info message.")
    logger.warn("This logs a warning message.")
    logger.error("This logs an error message.")
    try:
        raise Exception("This is a handled exception")
    except Exception:
        logger.exception("This logs an exception.")

    raise Exception("This is an unhandled exception")


class FileDownloadListAPIView(generics.ListAPIView):

    def get(self, request, format=None):
        queryset = Upload.objects.order_by('id')[0]
        file_handle = queryset.file.path
        document = open(file_handle, 'rb')
        response = HttpResponse(FileWrapper(document), content_type='application/msword')
        response['Content-Disposition'] = 'attachment; filename="%s"' % queryset.filename
        return response


class DeviceManagment(APIView):
    serializer_class = Devicesserializer
    serializer_class2 = DeviceTransactionSelializer
    def get_object(self, pk):
        try:
            return Devices.objects.get(pk=pk)
        except Devices.DoesNotExist:
            return 0
    def get_device(self, pk):
        try:
            return DeviceTransaction.objects.get(pk=pk)
        except DeviceTransaction.DoesNotExist:
            return 0

    def get(self, request):
        output = [{"device_ID": output.device_ID, "MAC": output.MAC, "POS": output.POS,
                    "PRINTER": output.PRINTER, "CUTTER": output.CUTTER,"API": output.API, "NUMBER": output.NUMBER,
                    "DateTime": output.DateTime, "lastUpdate": output.lastUpdate, "UpdateVersion":output.UpdateVersion}
                for output in Devices.objects.all()]
        return Response(output)


    def post(self, request, format=None):
        print(request.data)
        if "PAYMENT" in request.data:
            x=request.data["PAYMENT"]
            print('payment')
            if self.get_object(request.data["device_ID"]):
                print('payment1')
                device = self.get_object(request.data["device_ID"])
                serializerP = Devicesserializer(device,data=request.data)
                if serializerP.is_valid():
                    print(x['CODE'])
                    payment = DevicePayment.objects.create(
                        device_ID = device, CODE = x['CODE'], REF = x['REF'],
                        PRICE = x['PRICE'],DATETIME = x['DATETIME']
                    )
                    payment.save()
                    serializerP.save()
                    if request.data["UpdateVersion"]== Upload.objects.order_by('id')[0].id :
                        return Response("", status=status.HTTP_201_CREATED)
                    else:
                        
                        return Response("http://127.0.0.1:8000/api/download/",status=status.HTTP_201_CREATED)

                return Response(serializerP.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                print(x)
                print('payment2')
                serializerP = DeviceTransactionSelializer(data=x)
                if serializerP.is_valid():
                    serializerP.save()
                    return Response(serializerP.data, status=status.HTTP_201_CREATED)
                return Response(serializerP.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            if self.get_object(request.data["device_ID"]):
                print('creat1')
                device = self.get_object(request.data["device_ID"])
                serializer = Devicesserializer(device, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    if request.data["UpdateVersion"]== Upload.objects.order_by('id')[0].id :
                        return Response("", status=status.HTTP_201_CREATED)
                    else:
                        
                        return Response("http://127.0.0.1:8000/api/download/",status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                print('creat2')
                serializer = Devicesserializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    if request.data["UpdateVersion"]== Upload.objects.order_by('id')[0].id :
                        return Response("", status=status.HTTP_201_CREATED)
                    else:
                        
                        return Response("http://127.0.0.1:8000/api/download/",status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ConvertedDeviceManagment(APIView):

    def get_object(self, pk):
        try:
            return ConvertedDevices.objects.get(pk=pk)
        except ConvertedDevices.DoesNotExist:
            return 0

    def get(self, request):
        output = [{"device_ID": output.device_ID, "MAC": output.MAC, "POS": output.POS,
                    "PRINTER": output.PRINTER, "CUTTER": output.CUTTER,"API": output.API, "NUMBER": output.NUMBER,
                    "DateTime": output.DateTime, "lastUpdate": output.lastUpdate, "status":output.status}
                for output in ConvertedDevices.objects.all()]
        return Response(output)

class DevicePayments(APIView):
    serializer_class = Devicesserializer

    def get_object(self, pk):
        try:
            return Devices.objects.get(device_ID=pk)
        except Devices.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        payments = DevicePayment.objects.filter(device_ID = pk)
        output = [{"device_ID": pk, "CODE": output.CODE, "REF": output.REF,
                    "PRICE": output.PRICE, "DATETIME": output.DATETIME}
                for output in payments]
        return Response(output)


class Test(APIView):
    def get(self, request, format = None):
        item = Devices.objects.order_by('device_ID')[0].DateTime
        y = item.strftime("%Y")
        m = item.strftime("%m")
        d = item.strftime("%d")
        print(int(y))
        item2 = datetime.now()
        print(item2.strftime("%H-%M"))
        c = jdatetime.date.fromgregorian(day = int(d), month = int(m), year = int(y))
        print(c)
        tz=timezone.localtime(timezone.now())
        formatDate2 = tz.strftime("%d-%b-%y")
        return Response(formatDate2)




class FileUpload(APIView):

    def get(self, request,format=None):
        output = [{"id":output.id, "file":output.file, 
                    "filename":output.filename}
                for output in Upload.objects.all()]
        return Response(output)
    def post(self, request, format=None):
        print(request.data['file'])
        serializer_class = UploadSerializer(data=request.data)
        print(serializer_class)
        if serializer_class.is_valid():
            print(2)
            serializer_class.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class FileUploadViewSet(viewsets.ViewSet):

    def create(self, request):
        serializer_class = FileSerializer(data=request.data)
        if 'file' not in request.FILES or not serializer_class.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            #Single File
            handle_uploaded_file(request.FILES['file'])

            return Response(status=status.HTTP_201_CREATED)

def handle_uploaded_file(f):
    with open(f.name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

