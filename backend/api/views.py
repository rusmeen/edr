from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser 
from django.http.response import JsonResponse

from . models import Category_schema
from . serializers import categorySerializer,categorySchemaSerializer

from rest_framework.decorators import api_view
import json
from rest_framework.decorators import api_view
from rest_framework import generics
from api.serializers import RegisterSerializer, UserSerializer


class UserListAPI(APIView):
    def get(self, request, *args, **kwargs):
        users = {"rahul": "srivastav", "rusmeen": "khan"}
        return Response(users, status=status.HTTP_200_OK)


class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user_data = UserSerializer(user, context=self.get_serializer_context()).data
        return Response(
            user_data,
            status=status.HTTP_201_CREATED,
        )


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
        schema = category.schema
        new_loaded_schema = json.loads(schema)
        category.schema = new_loaded_schema
        
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

    
@api_view(['GET'])
def get_other_propety_till_now(requset, pk):
    try: 
        category =  Category_schema.objects.get(pk=pk) 
        schema = category.schema
        print("schema ====> ",schema)
        # category.schema = {'name ' : 'rahul'}

        #iterate over schema categories ..
        jsonObject = json.loads(schema)
        # categories_list = jsonObject['categories']

        # print the keys and values
        for category_list in  jsonObject :
            obj = json.load(jsonObject[category_list])
            print('.................  ', obj
            )
            for key in obj:
                value = obj[key]
                print("The key and value are ({}) = ({})".format(key, value))   


        category_serializer = categorySchemaSerializer(category) 
        return JsonResponse(category_serializer.data)

        
    except Category_schema.DoesNotExist: 
        return JsonResponse({'message': 'The Category does not exist'}, status=status.HTTP_404_NOT_FOUND)


       
   

    
    




    
    

    
