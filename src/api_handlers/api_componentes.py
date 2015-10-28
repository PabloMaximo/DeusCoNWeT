#!/usr/bin/python
# -*- coding: utf-8 -*-

""" Copyright 2015 Luis Ruiz Ruiz
  Copyright 2015 Ana Isabel Lopera Martínez
  Copyright 2015 Miguel Ortega Moreno
  Copyright 2015 Juan Francisco Salamanca Carmona
  
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
"""

import webapp2
import string
import json

import ndb_pb
from api_oauth import SessionHandler

import cliente_gitHub

social_list = ["twitter", "facebook", "stackoverflow", "instagram", "linkedin", "googleplus", "github"]

class ComponentListHandler(SessionHandler):

    """
    Class that defines the component list resource.
    It acts as the handler of the /components resource

    Methods:
    get -- Gets a filtered list of the components stored in the system  
    put -- Uploads a component
    """

    # GET Method
    def get(self):
        """ Gets a filtered list of the components stored in the system
        Keyword arguments: 
        self -- info about the request build by webapp2
        """
        # Get the cookie in the request
        cookie_value = self.request.cookies.get("session")
        # Social_network,filter_param and list_format are optional params
        social_network = self.request.get("social_network", default_value="")
        filter_param = self.request.get("filter",default_value="general")
        list_format = self.request.get("list_format", default_value="reduced") 

        # Lists of posible values for each param
        filter_list = ["general","user"]
        format_list = ["complete","reduced"]
        if not cookie_value == None:
            user_id = self.getUserInfo(cookie_value)
            if not user_id == None:
                if social_network in social_list  or social_network == "" and filter_param in filter_list and list_format in format_list:
                    format_flag = True if list_format == "complete" and filter_param == "user" else False
                    user_filter = True if filter_param == "user" else False
                    # Get the component list, according to the filters given
                    component_list = ndb_pb.getComponents(user_id, social_network, format_flag, user_filter)
                    if not len(component_list) == 0:
                        self.response.content_type = "application/json"
                        self.response.write(component_list)
                        self.response.set_status(200)
                    else:
                        self.response.set_status(204)
                else:
                    response = \
                    {"error": "Invalid value for param social_network, filter o list_format"}
                    self.response.content_type = "application/json"
                    self.response.write(json.dumps(response))
                    self.response.set_status(400)        
            else:
                response = \
                    {"error": "The cookie session provided does not belongs to any active user"}
                self.response.content_type = "application/json"
                self.response.write(json.dumps(response))
                self.response.set_status(400)    
        else:
            response = {"error": "You must provide a session cookie"}
            self.response.content_type = "application/json"
            self.response.write(json.dumps(response))
            self.response.set_status(401)
        

    # POST Method
    def put(self):
        """ Uploads a component. The component is stored in the Datastore of the application
        Keyword arguments: 
        self -- info about the request build by webapp2
        """
        try:
            # Get the request POST params 
            url = self.request.POST["url"] # Url to the component stable repo
            component_id = self.request.POST["component_id"]
            description = self.request.POST["description"]
            social_network = self.request.POST["social_network"]
            input_type = self.request.POST.getall("input_type")
            output_type = self.request.POST.getall("output_type")
            version_list = self.request.POST.getall("versions")
            
            # Predetermined is an optional param (default_value=False)
            predetermined = None
            if self.request.POST.has_key("predetermined"):
                if self.request.POST["predetermined"] in ["True","true"]:
                    predetermined = True
                elif self.request.POST["predetermined"] in ["False","false"]:
                    predetermined = False
            else:
                predetermined = False
            # We check if the social network param has a proper value
            if social_network in social_list:
                # We check if the request has provided at least the version "stable" for the version_list param
                if "stable" in version_list:
                    # We check if "predetermined" has a boolean value
                    if not predetermined == None: #isinstance(predetermined,bool):
                        # We check if the component exists in our system
                        component_stored = ndb_pb.searchComponent(component_id)
                        if component_stored == None:
                            # Adds the component to datastore
                            ndb_pb.insertComponent(component_id, url, description, social_network, input_type, output_type, version_list, predetermined)
                            response = {"status": "Component uploaded succesfully"}
                            self.response.write(json.dumps(response))
                            self.response.set_status(201)
                        else:
                            self.response.set_status(403)
                    else:
                        response = {"error": "Bad value for 'predetermined' param (it must be 'True' or 'False')"}
                        self.response.write(json.dumps(response))
                        self.response.set_status(400)    
                else:
                    response = {"error": "The versions param must contains stable as one of its values"}
                    self.response.write(json.dumps(response))
                    self.response.set_status(400)
            else:
                response = {"error": "Bad value for the social_network param"}
                self.response.content_type = "application/json"
                self.response.write(json.dumps(response))
                self.response.set_status(400)                

        except KeyError:
            response = {"error": "Missing params in the request body"}
            self.response.content_type = "application/json"
            self.response.write(json.dumps(response))
            self.response.set_status(400)

class ComponentHandler(SessionHandler):
    """
    Class that defines the component resource
    It acts as the handler of the /components/{component_id} resource
    Methods:
    get -- Gets the info about a component 
    post -- Modifies the info about a component
    delete -- Deletes a component in the system
    """

    # GET Method
    def get(self, component_id):
        """ Gets the info about a component or
        gets a filtered list of the components stored in the system
        Keyword arguments: 
        self -- info about the request build by webapp2
        component_id -- path url directory corresponding to the component id
        """
        # Get the cookie in the request
        cookie_value = self.request.cookies.get("session")
        # Format is an optional param
        format = self.request.get("format", default_value="reduced")
        if not cookie_value == None:
            user_id = self.getUserInfo(cookie_value)
            if not user_id == None and format == "reduced" or format == "complete":
                format_flag = True if format == "complete" else False
                component = ndb_pb.getComponent(user_id, component_id, format_flag)
                if not component == None:
                    self.response.content_type = "application/json"
                    self.response.write(component)
                    self.response.set_status(200)
                else:
                    response = \
                    {"error": "Component not found in the system"}
                    self.response.content_type = "application/json"
                    self.response.write(json.dumps(response))
                    self.response.set_status(404)            
            else:
                response = \
                    {"error": "The cookie session or the format param provided are incorrect"}
                self.response.content_type = "application/json"
                self.response.write(json.dumps(response))
                self.response.set_status(400)
        else:
            response = {"error": "You must provide a session cookie"}
            self.response.content_type = "application/json"
            self.response.write(json.dumps(response))
            self.response.set_status(401)


    # POST Method
    def post(self, component_id):
        """ - Modifies the info about a component
        Keyword arguments: 
        self -- info about the request build by webapp2
        component_id -- path url directory corresponding to the component id
        """
        # Get the cookie in the request
        cookie_value = self.request.cookies.get("session")
        # Rating, x_axis, y_axis are optional params
        rating = self.request.get("rating", default_value="none")
        x_axis = self.request.get("x_axis", default_value="none")
        y_axis = self.request.get("y_axis", default_value="none")
        listening = self.request.get("listening", default_value="none")
        
        url = self.request.get("url", default_value="none")
        description = self.request.get("description", default_value="none")
        version_list = self.request.get_all("version")
        input_list = self.request.get_all("input_type")
        output_list = self.request.get_all("output_type")
        if not cookie_value == None:
            # Checks whether the cookie belongs to an active user and the request has provided at least one param
            user_id = self.getUserInfo(cookie_value)
            if not user_id == None and not rating == "none" or not x_axis == "none" or not y_axis == "none" :
                user_component_data = {}
                global_component_data = {}
                component_modified_success = False
                rating_error = False
                # We get the data from the request
                try:
                    if not rating == "none":
                        rating_value = float(rating)
                    if not x_axis == "none":
                        user_component_data["x"] = float(x_axis)
                    if not y_axis == "none":
                        user_component_data["y"] = float(y_axis)
                    if not listening == "none":
                        user_component_data["listening"] = listening

                    if not url == "none":
                        global_component_data["url"] = url
                    if not description == "none":
                        global_component_data["description"] = description
                    if not version_list == None:
                        global_component_data["version_list"] = version_list
                    if not input_list == None:
                        global_component_data["input_list"] = input_list
                    if not output_list == None:
                        global_component_data["output_list"] = output_list
                    
                except ValueError:
                    response = \
                    {"error": "x_axis, y_axis and rating must have a numeric value"}
                    self.response.content_type = "application/json"                
                    self.response.write(json.dumps(response))
                    self.response.set_status(400)

                # Updates the component rating
                if not rating == "none":
                    if rating_value > 0 and rating_value < 5:
                        rating_updated = ndb_pb.addRate(user_id, component_id, rating_value)
                        if not rating_updated:
                            rating_error = True
                            response = {"error": "The component_id specified does not belong to the user dashboard"}
                            self.response.content_type = "application/json"                
                            self.response.write(json.dumps(response))
                            self.response.set_status(400)
                        else:
                            component_modified_success = True
                    else:
                        rating_error = True
                        response = \
                        {"error": "Rating must be a numeric value between 0.0 and 5.0"}
                        self.response.content_type = "application/json"                
                        self.response.write(json.dumps(response))
                        self.response.set_status(400)

                # Updates the info about the component
                if not len(user_component_data) == 0 and not rating_error:
                    ndb_pb.modifyUserComponent(user_id, component_id,user_component_data)
                    component_modified_success = True
                if not len(global_component_data) == 0:
                    ndb_pb.updateComponent(component_id, url, description,input_type=input_list,output_type=output_list, version_list=version_list)
                    component_modified_success = True
                
                # Compounds the success response if the component has been updated successfully
                if component_modified_success:
                    response = {"status": "Component updated succesfully"}
                    self.response.content_type = "application/json"                
                    self.response.write(json.dumps(response))
                    self.response.set_status(200)
            else:
                response = \
                    {"error": "The cookie session provided does not belongs to any active user"}
                self.response.content_type = "application/json"
                self.response.write(json.dumps(response))
                self.response.set_status(400)
        else:
            response = {"error": "You must provide a session cookie"}
            self.response.content_type = "application/json"
            self.response.write(json.dumps(response))
            self.response.set_status(401)


    # DELETE Method
    def delete(self, component_id):
        """ - Deletes a component in the system
        Keyword arguments: 
        self -- info about the request build by webapp2
        component_id -- path url directory corresponding to the component id
        """
        scope = self.request.get("scope", default_value="user")
        cookie_value = self.request.cookies.get("session")
        
        if scope=="user":
            if not cookie_value == None:
                user_logged_key = self.getUserInfo(cookie_value)
                if not user_logged_key == None:
                    deactivated = ndb_pb.deactivateUserComponent(user_logged_key, component_id)
                    if deactivated:
                        response = {"status": "Component deleted succesfully"}
                        self.response.content_type = "application/json"
                        self.response.write(json.dumps(response))
                        self.response.set_status(200)
                    else:
                        response = {"error": "The component does not correspond to the user's dashboard"}
                        self.response.content_type = "application/json"
                        self.response.write(json.dumps(response))
                        self.response.set_status(404)
                else:
                    self.response.content_type = "application/json"
                    self.response.write(json.dumps({"error": "The session cookie header does not belong to an active user in the system"}))
                    self.response.set_status(400)    
            else:
                self.response.content_type = "application/json"
                self.response.write(json.dumps({"error": "To perform this action, you must be authenticated"}))
                self.response.set_status(401)
        elif scope=="global":
            # Deletes the component in the datastore
            deleted = ndb_pb.deleteComponent(component_id)
            if deleted:
                response = {"status": "Component deleted succesfully"}
                self.response.content_type = "application/json"
                self.response.write(json.dumps(response))
                self.response.set_status(204)
            else:
                response = {"error": "Component not found in the system"}
                self.response.content_type = "application/json"
                self.response.write(json.dumps(response))
                self.response.set_status(404)
        else:
            response = {"error": "Bad value for the scope params"}
            self.response.content_type = "application/json"
            self.response.write(json.dumps(response))
            self.response.set_status(400)

