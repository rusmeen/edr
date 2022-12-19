import json
class category_util:
    def get_all_category(categoryList):
        category_name =[]
        for obj in  categoryList :
            category_name.append(obj['name'])
        return category_name