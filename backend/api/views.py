from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser 
from django.http.response import JsonResponse

from . models import Category_schema
from . serializer import categorySerializer

from rest_framework.decorators import api_view


class UserListAPI(APIView):
    def get(self, request, *args, **kwargs):
        users = {"rahul": "srivastav", "rusmeen": "khan"}
        return Response(users, status=status.HTTP_200_OK)


    #################################################################################################
##################### Category APIs: Start ###############################################################
    #################################################################################################
category = []

class CategoryList(APIView):
    
    def get(self,requset):
        category1 = Category_schema.objects.all()
        serializer = categorySerializer(category1,many=True)
        return Response(serializer.data) 

    def post(self,request):
        category_data = JSONParser().parse(request)
        category_serializer = categorySerializer(data=category_data)
        if category_serializer.is_valid():
            category_serializer.save()
            return JsonResponse(category_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
def by_id( request,pk):
    try: 
        category =  Category_schema.objects.get(pk=pk) 
        
    except Category_schema.DoesNotExist: 
                return JsonResponse({'message': 'The Category does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET': 
        category_serializer = categorySerializer(category) 
        return JsonResponse(category_serializer.data)  
   
    elif request.method == 'PUT': 
        category_data = JSONParser().parse(request) 
        category_serializer = categorySerializer(category, data=category_data) 
        if category_serializer.is_valid(): 
            category_serializer.save() 
            return JsonResponse(category_serializer.data) 
        return JsonResponse(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        category.delete() 
        return JsonResponse({'message': 'category was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)   


    
           
   

    
    




    
    

    
