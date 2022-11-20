from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


class UserListAPI(APIView):
    def get(self, request, *args, **kwargs):
        users = {"rahul": "srivastav", "rusmeen": "khan"}
        return Response(users, status=status.HTTP_200_OK)
