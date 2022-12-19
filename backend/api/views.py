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
from django.forms.models import model_to_dict
from  businesslogics.category_util import category_util as cat_util
from django.forms.models import model_to_dict



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
    
    def get(self,request):
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

     #################################################################################################
##################### Schema APIs: Start ###############################################################
    #################################################################################################   
@api_view(['GET'])
def get_schema(requset, pk):
    try: 
        category =  Category_schema.objects.get(pk=pk) 
        schema = category.schema
        print("schema ====> ",schema)
        new_loaded_schema = json.loads(schema)
        category.schema = new_loaded_schema

        #iterate over schema categories ..
      

        # print the keys and values
        categories_list = new_loaded_schema['categories']
        for obj in  categories_list :
            print('.................  ', obj)
            for key in obj:
                value = obj[key]
                print("The key and value are ({}) = ({})".format(key, value))   

        category_serializer = categorySchemaSerializer(category) 
        return JsonResponse(category_serializer.data)

        
    except Category_schema.DoesNotExist: 
        return JsonResponse({'message': 'The Category does not exist'}, status=status.HTTP_404_NOT_FOUND)

    
@api_view(['GET'])
def get_other_properties_till_now(request, pk):
    try: 
        category =  Category_schema.objects.get(pk=pk) 
        schema = category.schema
        print("schema ====> ",schema)
        new_loaded_schema = json.loads(schema)
        category.schema = new_loaded_schema

        categories_list = new_loaded_schema['categories']
        others =[]

        # print the keys and values
        for obj in  categories_list :
        
            print('.................  ', obj)
            for key in obj['others']:
                #value = obj[key]
                is_present = False
                for index, dictionary in enumerate(others):
                    print(key['name'] , dictionary.get('name'))
                    if dictionary.get('name') == key['name']:
                        is_present = True
                if not is_present :
                #  {'id': 2, 'name': 'bobby', 'salary': 101}
                    others.append(key)
                print("The key and value are ({}) = ({})".format(type(key),key ))  

        category.schema = others 

        print('000000 ' , schema)

        category_serializer = categorySchemaSerializer(category) 
        return JsonResponse(category_serializer.data)

        
    except Category_schema.DoesNotExist: 
        return JsonResponse({'message': 'The Category does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def delete_label_from_schema(request , pk):
    try: 
        category =  Category_schema.objects.get(pk=pk) 
        schema = category.schema
        print("schema ====> ",schema)
        new_loaded_schema = json.loads(schema)
        category.schema = new_loaded_schema
        req   = JSONParser().parse(request)
        # print the keys and values
        categories_list = new_loaded_schema['categories']
        print('req :' ,req)
        # to delete dictionary in list
        res = [i for i in categories_list if not (i['name'] == req['name'])]
        new_loaded_schema['categories'] = res
        category.schema = new_loaded_schema
        print((category))

        dict = model_to_dict(category)
        category_serializer = categorySchemaSerializer(category,data=dict) 
        if category_serializer.is_valid():
            category_serializer.save()
            return JsonResponse(category_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
    except Category_schema.DoesNotExist: 
        return JsonResponse({'message': 'The Category does not exist'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['PUT'])
def post_label(request,pk):
    try:
        category =  Category_schema.objects.get(pk=pk) 
        original_category = category

        
        new_category_data = JSONParser().parse(request)
        # new_category_data = json.loads(new_category_data)

        schema = category.schema
        # if isinstance(schema, str):
        #     schema = json.dumps(schema)
        print(schema)
        new_loaded_schema = json.loads(schema.replace("\\", " "))
        all_category_till_now = cat_util.get_all_category(new_loaded_schema['categories'])

        if new_category_data['name'] in all_category_till_now:
            return  JsonResponse({'message': 'The Category already exists'}, status=status.HTTP_403_FORBIDDEN)


        category.schema = new_loaded_schema
        print(type(new_loaded_schema))
        categories_list = new_loaded_schema['categories']
        value_exists =False
        for index, dictionary in enumerate(categories_list):
            if dictionary['name'] == new_category_data['name']:
                value_exists = True
                break
        print(value_exists)
        if value_exists == False:
            categories_list.append(new_category_data)
            print(type(schema))
            new_loaded_schema['categories'] = categories_list
            category.schema = new_loaded_schema
        print((category))

        dict = model_to_dict(category)
        print(dict)
        print(original_category)
        category_serializer = categorySchemaSerializer(original_category,data=dict)
        if category_serializer.is_valid():
            category_serializer.save()
            return JsonResponse(category_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Category_schema.DoesNotExist: 
                return JsonResponse({'message': 'The Category does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def edit_label(request,pk):
    try:
        category =  Category_schema.objects.get(pk=pk) 
        original_category = category

        
        new_category_data = JSONParser().parse(request)
        # new_category_data = json.loads(new_category_data)

        schema = category.schema
        # if isinstance(schema, str):
        #     schema = json.dumps(schema)
        print(schema)
        new_loaded_schema = json.loads(schema.replace("\\", " "))
        all_category_till_now = cat_util.get_all_category(new_loaded_schema['categories'])

        if new_category_data['name'] not in all_category_till_now:
            return  JsonResponse({'message': 'The Label does not exists'}, status=status.HTTP_403_FORBIDDEN)


        category.schema = new_loaded_schema
        print(type(new_loaded_schema))
        categories_list = new_loaded_schema['categories']
        for index, dictionary in enumerate(categories_list):
            if dictionary['name'] == new_category_data['name']:
                categories_list[index]['name'] = new_category_data['name']
                new_loaded_schema['categories'] = categories_list
                category.schema = new_loaded_schema
                break

        dict = model_to_dict(category)
        print(type(dict) , '--------------------------------dict type ') 
        print(original_category)
        category_serializer = categorySchemaSerializer(original_category,data=dict)
        if category_serializer.is_valid():
            category_serializer.save()
            return JsonResponse(category_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Category_schema.DoesNotExist: 
                return JsonResponse({'message': 'The Category does not exist'}, status=status.HTTP_404_NOT_FOUND)
       
   

    
    




    
    

    
