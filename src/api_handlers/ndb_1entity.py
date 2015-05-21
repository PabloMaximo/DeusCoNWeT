"""
  Copyright 2014 Juan Francisco Salamanca Carmona
  Copyright 2014 Luis Ruiz Ruiz
  Copyright 2014 Ana Isabel Lopera Martinez
  Copyright 2014 Miguel Ortega Moreno

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

from google.appengine.ext import ndb

import webapp2, json, time
"""NDB Instances """

class Usuario(ndb.Model):

  # "Usuario Beta"

  email_beta = ndb.StringProperty()
  nombre_beta = ndb.StringProperty()
  apellidos_beta = ndb.StringProperty()

    # "Usuario"
  
  email_usuario = ndb.StringProperty()
  telefono_usuario = ndb.IntegerProperty()
  descripcion_usuario = ndb.TextProperty()
  imagen_usuario = ndb.StringProperty()
  
    #"Lista de redes"
  
  nombre_rs_pertenece_usuario = ndb.StringProperty(repeated=True)
  siguiendo_rs_pertenece_usuario = ndb.IntegerProperty(repeated=True)
  seguidores_rs_pertenece_usuario = ndb.IntegerProperty(repeated=True)
  url_sig_rs_pertenece_usuario = ndb.StringProperty(repeated=True)
  url_seg_rs_pertenece_usuario = ndb.StringProperty(repeated=True)
  
    # "lista_Grupos"
  
  # lista_Usuarios_grupo_pertenece_usuario = ndb.StringProperty(repeated=True)
  nombre_grupo_pertenece_usuario = ndb.StringProperty(repeated=True)
  descripcion_grupo_pertenece_usuario = ndb.StringProperty(repeated=True)
  
    # "Valoracion"
  
  name_valorada = ndb.StringProperty(repeated=True)
  rating_value_valorada = ndb.FloatProperty(repeated=True)
  
    # "componentes_usuario"
  
  nombre_componente_usuario = ndb.StringProperty(repeated=True)
  x_componente_usuario = ndb.FloatProperty(repeated=True)
  y_componente_usuario = ndb.FloatProperty(repeated=True)
  url_componente_usuario = ndb.StringProperty(repeated=True)
  height_componente_usuario = ndb.StringProperty(repeated=True)
  width_componente_usuario = ndb.StringProperty(repeated=True)
  input_type_componente = ndb.StringProperty(repeated=True)
  output_type_componente = ndb.StringProperty(repeated=True)
  listening_componente = ndb.StringProperty(repeated=True)
  
    # "token_usuario"
  
  id_fb_usuario = ndb.StringProperty()
  token_fb_usuario = ndb.StringProperty()
  id_tw_usuario = ndb.StringProperty()
  token_tw_usuario = ndb.StringProperty()
  id_sof_usuario = ndb.StringProperty()
  token_sof_usuario = ndb.StringProperty()
  id_li_usuario = ndb.StringProperty()
  token_li_usuario = ndb.StringProperty()
  id_ins_usuario = ndb.StringProperty()
  token_ins_usuario = ndb.StringProperty()
  id_git_usuario = ndb.StringProperty()
  token_git_usuario = ndb.StringProperty()
  id_google_usuario = ndb.StringProperty()
  token_google_usuario = ndb.StringProperty()

#######################################################
# Definicion de metodos para manejar la base de datos #
#######################################################

@ndb.transactional(xg=True)
def insertaUsuario(rs, identificador, token, datos=None):
  usuario = Usuario()
  if rs == "facebook":
    usuario.nombre_rs_pertenece_usuario.append(rs)
    usuario.token_fb_usuario = token
    usuario.id_fb_usuario = identificador
  elif rs == "twitter":
    usuario.nombre_rs_pertenece_usuario.append(rs)
    usuario.token_tw_usuario = token
    usuario.id_tw_usuario = identificador
  elif rs == "instagram":
    usuario.nombre_rs_pertenece_usuario.append(rs)
    usuario.token_ins_usuario = token
    usuario.id_ins_usuario = identificador
  elif rs == "github":
    usuario.nombre_rs_pertenece_usuario.append(rs)
    usuario.token_git_usuario = token
    usuario.id_git_usuario = identificador
  elif rs == "stack-overflow":
    usuario.nombre_rs_pertenece_usuario.append(rs)
    usuario.token_sof_usuario = token
    usuario.id_sof_usuario = identificador
  elif rs == "linkedin":
    usuario.nombre_rs_pertenece_usuario.append(rs)
    usuario.token_li_usuario = token
    usuario.id_li_usuario = identificador
  elif rs == "google":
    usuario.nombre_rs_pertenece_usuario.append(rs)
    usuario.token_google_usuario = token
    usuario.id_google_usuario = identificador
  else:
    return "La red social solicitada no esta contemplada"

  if not datos == None:
    if datos.has_key("email"):
      usuario.email_usuario = datos["email"]
    if datos.has_key("telefono"):
      usuario.telefono_usuario = datos["telefono"]
    if datos.has_key("descripcion"):
      usuario.descripcion_usuario = datos["descripcion"]
    if datos.has_key("imagen"):
      usuario.imagen_usuario = datos["imagen"]
  user_key = usuario.put()

  return user_key  

def actualizaUsuario(user_key, datos):
  usuario = user_key.get()
  if not datos == None: 
    if datos.has_key("email"):
      usuario.email_usuario = datos["email"]
    if datos.has_key("telefono"):
      usuario.telefono_usuario = datos["telefono"]
    if datos.has_key("descripcion"):
      usuario.descripcion_usuario = datos["descripcion"]
    if datos.has_key("imagen"):
      usuario.imagen_usuario = datos["imagen"]
  
  usuario.put()

def buscaUsuario(user_key):
  usuario = user_key.get()
  datos = {"email": usuario.email_usuario,
            "telefono": usuario.telefono_usuario,
            "descripcion":usuario.descripcion,
            "grupos": usuario.nombre_grupo_pertenece_usuario,
            "redes": usuario.nombre_rs_pertenece_usuario,
            "imagen": usuario.imagen_usuario}
  datos = json.dumps(datos)

  return datos

def insertaToken(user_key, rs, token, id_usuario):
  usuario = user_key.get()
  if rs == "facebook":
    usuario.token_fb_usuario = token
  elif rs == "twitter":
    usuario.token_tw_usuario = token
  elif rs == "instagram":
    usuario.token_ins_usuario = token
  elif rs == "github":
    usuario.token_git_usuario = token
  elif rs == "stack-overflow":
    usuario.token_sof_usuario = token
  elif rs == "linkedin":
    usuario.token_li_usuario = token
  elif rs == "google":
    usuario.token_google_usuario = token
  else:
    return "La red social solicitada no esta contemplada"

  usuario.put()

def modificaToken(identificador, token, rs):
  if rs == 'facebook':
    usuario = Usuario.query(Usuario.id_fb_usuario == identificador).get()
    usuario.token_fb_usuario = token
  if rs == 'twitter':
    usuario = Usuario.query(Usuario.id_tw_usuario == identificador).get()
    usuario.token_tw_usuario = token
  if rs == "stack-overflow":
    usuario = Usuario.query(Usuario.id_sof_usuario == identificador).get()
    usuario.token_sof_usuario = token
  if rs == "linkedin":
    usuario = Usuario.query(Usuario.id_li_usuario == identificador).get()
    usuario.token_li_usuario = token
  if rs == "instagram":
    usuario = Usuario.query(Usuario.id_ins_usuario == identificador).get()
    usuario.token_ins_usuario = token
  if rs == "github":
    usuario = Usuario.query(Usuario.id_git_usuario == identificador).get()
    usuario.token_git_usuario = token
  if rs == "google":
    usuario = Usuario.query(Usuario.id_google_usuario == identificador).get()
    usuario.token_google_usuario = token
  else:
    return "La red social solicitada no esta contemplada"

  usuario.put()

def getToken(user_key, rs):
  usuario = user_key.get()
  res = ''
  if rs == "facebook":
    res = usuario.token_fb_usuario
  elif rs == "twitter":
    res = usuario.token_tw_usuario
  elif rs == "stack-overflow":
    res = usuario.token_sof_usuario
  elif rs == "linkedin":
    res = usuario.token_li_usuario
  elif rs == "instagram":
    res = usuario.token_ins_usuario
  elif rs == "github":
    res = usuario.token_git_usuario
  elif rs == "google":
    res = usuario.token_goolge_usuario
  else:
    return "La red social solicitada no esta contemplada"
  return res

def buscaToken(identificador, rs):
  if rs == "facebook":
    qry = Usuario.query(Usuario.nombre_rs_pertenece_usuario == "facebook")
    qry = qry.filter(Usuario.id_fb_usuario == identificador)
    return qry.get().token_fb_usuario
  if rs == "twitter":
    qry = Usuario.query(Usuario.nombre_rs_pertenece_usuario == "twitter")
    qry = qry.filter(Usuario.id_tw_usuario == identificador)
    return qry.get().token_tw_usuario
  if rs == "stack-overflow":
    qry = Usuario.query(Usuario.nombre_rs_pertenece_usuario == "stack-overflow")
    qry = qry.filter(Usuario.id_sof_usuario == identificador)
    return qry.get().token_sof_usuario
  if rs == "linkedin":
    qry = Usuario.query(Usuario.nombre_rs_pertenece_usuario == "linkedin")
    qry = qry.filter(Usuario.id_li_usuario == identificador)
    return qry.get().token_li_usuario
  if rs == "instagram":
    qry = Usuario.query(Usuario.nombre_rs_pertenece_usuario == "instagram")
    qry = qry.filter(Usuario.id_ins_usuario == identificador)
    return qry.get().token_ins_usuario
  if rs == "github":
    qry = Usuario.query(Usuario.nombre_rs_pertenece_usuario == "github")
    qry = qry.filter(Usuario.id_git_usuario == identificador)
    return qry.get().token_git_usuario
  if rs == "google":
    qry = Usuario.query(Usuario.nombre_rs_pertenece_usuario == "google")
    qry = qry.filter(Usuario.id_google_usuario == identificador)
    return qry.get().token_google_usuario
  else:
    return "La red social solicitada no esta contemplada"


def insertaIdRS(user_key, rs, id_user):
  usuario = user_key.get()
  if rs == "facebook":
    usuario.id_fb_usuario = id_user
  elif rs == "twitter":
    usuario.id_tw_usuario = id_user
  elif rs == "instagram":
    usuario.id_ins_usuario = id_user
  elif rs == "github":
    usuario.id_git_usuario = id_user
  elif rs == "stack-overflow":
    usuario.id_sof_usuario = id_user
  elif rs == "linkedin":
    usuario.id_li_usuario = id_user
  elif rs == "google":
    usuario.id_google_usuario = id_user
  else:
    return "La red social solicitada no esta contemplada"
  
  usuario.put()

def getIdRS(user_key, rs):
  usuario = user_key.get()
  if rs == "facebook":
    identificador = usuario.id_fb_usuario
  elif rs == "twitter":
    identificador = usuario.id_tw_usuario
  elif rs == "stack-overflow":
    identificador = usuario.id_sof_usuario
  elif rs == "linkedin":
    identificador = usuario.id_li_usuario
  elif rs == "instagram":
    identificador = usuario.id_ins_usuario
  elif rs == "github":
    identificador = usuario.id_git_usuario
  elif rs == "google":
    identificador = usuario.id_google_usuario
  else:
    return "La red social solicitada no esta contemplada"

  return identificador

# Obligatoria una descripcion, aunque esta sea vacia
# En este modelo, este metodo es el mismo que se necesitaria en el caso de anadir un usuario
# al grupo, ya que no hay entidad grupo y es cada usuario particular el que tiene costancia
# de a que grupo pertenece
def insertaGrupo(user_key, grupos=[], descripcion=[]):
  usuario = user_key.get()
  if len(grupos) > 0:
    for grupo in grupos:
      usuario.nombre_grupo_pertenece_usuario.append(grupo)
    for desc in descripcion:
      usuario.descripcion_grupo_pertenece_usuario.append(desc)
  else:
    return "No se especifica ningun grupo que anadir"

def addDescripcionAGrupo(user_key, nombre, descripcion):
  usuario = user_key.get()
  for i in range(0,len(usuario.nombre_grupo_pertenece_usuario)):
    if(usuario.nombre_grupo_pertenece_usuario[i] == nombre):
      usuario.descripcion_grupo_pertenece_usuario[i] = descripcion

  usuario.put()

# Solo devuelve el nombre, no la descripcion
def buscaGrupos(user_key):
  usuario = user_key.get()
  datos = {}
  contador = 0
  res = {} 
  # Diferente opcion, diferente funcionalidad
  # res = [None]*len(usuario.nombre_grupo_pertenece_usuario)
  if len(usuario.nombre_grupo_pertenece_usuario) > 0:
    for grupo in usuario.nombre_grupo_pertenece_usuario:
      res[contador] = grupo
      contador += 1
      return json.dumps(res)
  else:
    return "No existen grupos para este usuario"

def insertaRed(user_key, red, datos=None):
  usuario = user_key.get()
  usuario.nombre_rs_pertenece_usuario.append(red)
  i = len(usuario.nombre_rs_pertenece_usuario)-1
  if not datos == None:
    if datos.has_key("siguiendo"):
      usuario.siguiendo_rs_pertenece_usuario.append(datos["siguiendo"])
    else:
       usuario.siguiendo_rs_pertenece_usuario.append(0)
    if datos.has_key("seguidores"):
      usuario.seguidores_rs_pertenece_usuario.append(datos["seguidores"])
    else:
       usuario.siguiendo_rs_pertenece_usuario.append(0)
    if datos.has_key("url_seg"):
      usuario.url_seg_rs_pertenece_usuario.append(datos["url_seg"])
    else:
       usuario.url_seg_rs_pertenece_usuario.append("")
    if datos.has_key("url_sig"):
      usuario.url_sig_rs_pertenece_usuario.append(datos["url_sig"])
    else:
       usuario.url_sig_rs_pertenece_usuario.append("")
  
  usuario.put()

def buscaRed(user_key):
  usuario = user_key.get()
  res = {}
  contador = 1
  if len(usuario.nombre_rs_pertenece_usuario) > 0:
    for red in usuario.nombre_rs_pertenece_usuario:
      res[contador] = red
      contador += 1

  return json.dumps(res)

def modificaRS(user_key, rs, seguidores=None, siguiendo=None, url_seguidores="", url_siguiendo=""):
  usuario = user_key.get()
  encontrado = False
  for i in range(0,len(usuario.nombre_rs_pertenece_usuario)):
    if usuario.nombre_rs_pertenece_usuario[i] == rs:
      encontrado = True
      usuario.seguidores_rs_pertenece_usuario[i] = seguidores
      usuario.siguiendo_rs_pertenece_usuario[i] = siguiendo
      usuario.url_seg_rs_pertenece_usuario[i] = url_seguidores
      usuario.url_sig_rs_pertenece_usuario[i] = url_siguiendo
  usuario.put()
  if encontrado == False:
    return "No existe una red social con ese nombre"

def insertarComponente(user_key, nombre, entrada="", salida="", coord_x=0.0, coord_y=0.0, url="", height="", width="", listening=""):
  usuario = user_key.get()

  usuario.nombre_componente_usuario.append(nombre)
  usuario.x_componente_usuario.append(coord_x)
  usuario.y_componente_usuario.append(coord_y)
  usuario.url_componente_usuario.append(url)
  usuario.height_componente_usuario.append(height)
  usuario.width_componente_usuario.append(width)
  usuario.input_type_componente.append(entrada)
  usuario.output_type_componente.append(salida)
  usuario.listening_componente.append(listening)

  usuario.put()

def modificarComponente(user_key, nombre, datos):
  usuario = user_key.get()
  encontrado = False
  for i in range(0,len(usuario.nombre_componente_usuario)):
    if(usuario.nombre_componente_usuario[i] == nombre):
      encontrado = True
      if datos.has_key("coord_x"):
        usuario.x_componente_usuario[i] = datos["coord_x"]
      if datos.has_key("coord_y"):
        usuario.y_componente_usuario[i] = datos["coord_y"]
      if datos.has_key("url"):
        usuario.url_componente_usuario[i] = datos["url"]
      if datos.has_key("height"):
        usuario.height_componente_usuario[i] = datos["height"]
      if datos.has_key("width"):
        usuario.width_componente_usuario[i] = datos["width"]
      if datos.has_key("entrada"):
        usuario.input_type_componente[i] = datos["entrada"]
      if datos.has_key("salida"):
        usuario.output_type_componente[i] = datos["salida"]
      return ""
  if encontrado == False:
    return "No existe un componente con ese nombre"
  usuario.put()

def getComponente(user_key, nombre):
  usuario = user_key.get()
  encontrado = False
  for i in range(0,len(usuario.nombre_componente_usuario)):
    if(usuario.nombre_componente_usuario[i] == nombre):
      encontrado = True
      datos={"coord_x": usuario.x_componente_usuario[i],
              "coord_y": usuario.y_componente_usuario[i],
              "url": usuario.url_componente_usuario[i],
              "height": usuario.height_componente_usuario[i],
              "width": usuario.width_componente_usuario[i],
              "entrada": usuario.input_type_componente[i],
              "salida": usuario.output_type_componente[i],
              "escuchando": usuario.listening_componente[i]
              }
      datos = json.dumps(datos)
      return datos
  if encontrado == False:
    return "No existe un componente con ese nombre"

def addListening(user_key, nombre, events):
  usuario = user_key.get()
  for i in range(0,len(usuario.nombre_componente_usuario)):
    if(usuario.nombre_componente_usuario[i] == nombre):
      listening_componente[i]=events      

  usuario.put()

def nuevoUsuarioBeta(email, nombre, apellidos):
  user_beta = Usuario()
  user_beta.email_beta = email
  user_beta.nombre_beta = nombre
  user_beta.apellidos_beta = apellidos

  user_beta.put()


def getEmails():
  users_beta = Usuario.query().fetch(100)
  lista = []
  for user in users_beta:
    if not user.email_beta == "":
      print(user.email_beta)
      lista.append(user.email_beta)
  return lista


def usuarioSuscrito(email):
  emails = getEmails()
  if email in emails:
    return True
  else:
    return False

class MainPage(webapp2.RequestHandler):
  def get(self):
    self.response.write('Ejecucion correcta\n')

    # Insertar usuario beta
    emp_nue_bet = time.time() * 1000
    key = nuevoUsuarioBeta("jfsalca", "JuanFran", "Salamanca")
    fin_nue_bet = time.time() * 1000
    time_nue_bet = fin_nue_bet - emp_nue_bet
    print "TIEMPO Nuevo Usuario Beta --> " + str(time_nue_bet)
    lista = usuarioSuscrito("jfsalcasda")
    self.response.write(lista)
    
    # Insertar usuario
    datos={"email":"jfsalca","telefono":667994811, "descripcion":"Prueba"}
    emp_ins_usu = time.time() * 1000
    key = insertaUsuario("twitter", "juanfrys", "token_1", datos)
    fin_ins_usu = time.time() * 1000
    time_ins_usu = fin_ins_usu - emp_ins_usu
    print "TIEMPO Insertar Usuario --> " + str(time_ins_usu)
    key = insertaUsuario("twitter", "pepe_2", "token_2", datos)
    key = insertaUsuario("google", "pepe_3", "token_3", datos)
    key = insertaUsuario("stack-overflow", "pepe_4", "token_4", datos)
    key = insertaUsuario("linkedin", "pepe_5", "token_5", datos)
    key = insertaUsuario("github", "pepe_6", "token_6", datos)
    key = insertaUsuario("instagram", "pepe_7", "token_7", datos)
    self.response.write(key.get().token_tw_usuario)

    if key == "La red social solicitada no esta contemplada":
      self.response.write(key)

    # Actualizar un usuario
    datos={"email":"email_prueba","telefono":667994123, "descripcion":"descripcion cambiada"}
    emp_act_usu = time.time() * 1000
    respuesta = actualizaUsuario(key, datos)
    fin_act_usu = time.time() * 1000
    time_act_usu = fin_act_usu - emp_act_usu
    print "TIEMPO Actualizar Usuario --> " + str(time_act_usu)

    # Insertar token
    emp_ins_tok = time.time() * 1000
    respuesta = insertaToken(key, "facebook", "token_fb_usuario", "Juan Francisco")
    fin_ins_tok = time.time() * 1000
    time_ins_tok = fin_ins_tok - emp_ins_tok
    print "TIEMPO Insertar Token --> " + str(time_ins_tok)

    # Modificar token
    emp_mod_tok = time.time() * 1000
    respuesta = modificaToken("juanfrys", "token_cambiado", "twitter")
    fin_mod_tok = time.time() * 1000
    time_mod_tok = fin_mod_tok - emp_mod_tok
    print "TIEMPO Modificar Token --> " + str(time_mod_tok)
    self.response.write(key.get().token_tw_usuario)
    
    # Buscar token
    emp_get_tok = time.time() * 1000
    respuesta = getToken(key, "facebook")
    fin_get_tok = time.time() * 1000
    time_get_tok = fin_get_tok - emp_get_tok
    print "TIEMPO Get Token --> " + str(time_get_tok)
    self.response.write(respuesta)

    # Insertar id
    respuesta = insertaIdRS(key, "instagram", "id_ins")
    self.response.write(respuesta)
    
    # Buscar id
    respuesta = getIdRS(key, "asd")
    self.response.write(respuesta)

    # Insertar grupo
    grupo=["grupo1", "grupo2"]
    descripcion=["", "grupo pintura"]
    emp_ins_gru = time.time() * 1000
    respuesta=insertaGrupo(key,grupo,descripcion)
    fin_ins_gru = time.time() * 1000
    time_ins_gru = fin_ins_gru - emp_ins_gru
    print "TIEMPO Insertar Grupo --> " + str(time_ins_gru)
    self.response.write(key.get().descripcion_grupo_pertenece_usuario)

    # Anadir descripcion a grupo
    emp_add_des = time.time() * 1000
    desc = addDescripcionAGrupo(key, "grupo2", "desc_grupo_X")
    fin_add_des = time.time() * 1000
    time_add_des = fin_add_des - emp_add_des
    print "TIEMPO Add Descripcion Grupo --> " + str(time_add_des)
    self.response.write(key.get().descripcion_grupo_pertenece_usuario )

    # Buscar grupo
    emp_bus_gru = time.time() * 1000
    busqueda=buscaGrupos(key)
    fin_bus_gru = time.time() * 1000
    time_bus_gru = fin_bus_gru - emp_bus_gru
    print "TIEMPO Busca Usuario --> " + str(time_bus_gru)
    if not busqueda == "No existen grupos para este usuario":
      busqueda=json.loads(busqueda)
    self.response.write(busqueda)

    # Insertar red
    datos_red = {"siguiendo": 123, "seguidores": 50, "url_sig": "api.twitter.com/get_following"}
    emp_ins_red = time.time() * 1000
    respuesta = insertaRed(key, "facebook", datos_red)
    fin_ins_red = time.time() * 1000
    time_ins_red = fin_ins_red - emp_ins_red
    print "TIEMPO Get Token --> " + str(time_ins_red)
    datos_red2 = {"siguiendo": 111, "seguidores": 555, "url_seg": "pene", "url_sig": "api.twitter.com/get_following"}
    insertaRed(key, "twitter", datos_red2)

    self.response.write(key.get().siguiendo_rs_pertenece_usuario)
    self.response.write(key.get().seguidores_rs_pertenece_usuario)
    self.response.write(key.get().url_sig_rs_pertenece_usuario)
    self.response.write(key.get().url_seg_rs_pertenece_usuario)

    # Buscar red
    emp_bus_red = time.time() * 1000
    busqueda = buscaRed(key)
    fin_bus_red = time.time() * 1000
    time_bus_red = fin_bus_red - emp_ins_red
    print "TIEMPO Buscar Red --> " + str(time_bus_red)
    busqueda = json.loads(busqueda)
    self.response.write(busqueda)

    # Anadir datos a red
    modificaRS(key, "facebook", 20, 30)

    # Insertar componente
    emp_ins_com = time.time() * 1000
    insertarComponente(key, "nombre_comp", 2.0, 2.0, "url", "45px", "45px")
    fin_ins_com = time.time() * 1000
    time_ins_com = fin_ins_com - emp_ins_com
    print "TIEMPO Insertar Componente --> " + str(time_ins_com)

    #Modificar componentes
    insertarComponente(key, "nombre_comp3", 2.0, 2.0, "url", "2.0", "2.0")
    datos={"url":"asdasd", "coord_x":4.82, "width": "45px"}
    datos2={"height":"345px", "coord_y":1}
    modificarComponente(key, "nombre_comp", datos)
    modificarComponente(key, "nombre_comp3", datos2)

    # Buscar componente
    emp_get_com = time.time() * 1000
    busqueda = getComponente(key, "nombre_comp")
    fin_get_com = time.time() * 1000
    time_get_com = fin_get_com - emp_get_com
    print "TIEMPO Get Componente --> " + str(time_bus_com)
    self.response.write(busqueda)
    if not busqueda == "No existe un componente con ese nombre":
      busqueda = json.loads(busqueda)
    self.response.write(busqueda["width"])

    emp_bus_tok = time.time() * 1000
    token_jf = buscaToken("juanfrys", "twitter")
    fin_bus_tok = time.time() * 1000
    time_bus_tok = fin_bus_tok - emp_bus_tok
    print "TIEMPO Busca Token --> " + str(time_bus_tok)

    emp_bus_usu = time.time() * 1000
    user = buscaUsuario(key)
    fin_bus_usu = time.time() * 1000
    time_bus_usu = fin_bus_usu - emp_bus_usu
    print "TIEMPO Busca Usuario --> " + str(time_bus_usu)

    emp_get_ema = time.time() * 1000
    lista_emails = getEmails()
    fin_get_ema = time.time() * 1000
    time_get_ema = fin_get_ema - emp_get_ema
    print "TIEMPO Get Emails --> " + str(time_get_ema)

application = webapp2.WSGIApplication([
    ('/', MainPage),
], debug=True)