# -*- coding: utf8 -*-
import sys, urllib
import test_utils

# Script para hacer pruebas a la API de Usuarios de PicBit (api/usuarios)
# Si no se especifica ninguna opción, se ejecutan test relativos obtención y modificación de recursos
# Uso: python api_usuarios_tester [borrado]


def main():
	test_utils.openConnection(False) # Pruebas en local (remote = False)
	option = None
	session1 = None
	session2 = None
	session_error = "session=session_error"
	user_id1 = "id_test_usuario1"
	user_id2 = "id_test_usuario2"
	user_id_error = "idERROR"
	basepath = "/api/usuarios"

	if len(sys.argv) == 2:
		option = sys.argv[1]

	# PRETESTs: Inicio de sesion con Google+ en el sistema
	# Iniciamos dos sesiones
	token_id_login = "idgoogle"
	access_token_login = "googleTEST"
	token_id_login2 = "idgoogle2"
	access_token_login2 = "googleTEST2"
	session1 = test_utils.do_login_or_signup("googleplus", token_id_login, access_token_login, user_id1)
	session2 = test_utils.do_login_or_signup("googleplus", token_id_login2, access_token_login2, user_id2)

	if option == None:
		params = urllib.urlencode({})

		# TESTs Relativos a la obtención de lista de usuarios
		# TEST 1
		print "TEST 1: Obtener lista de usuarios (sin proporcionar una cookie de sesion)"
		print "Status esperado: 401"
		test_utils.make_request("GET", basepath, params, 401, None)

		# TEST 2
		print "TEST 2: Obtener lista de usuarios (proporcionando una cookie de sesion no válida)"
		print "Status esperado: 400"
		test_utils.make_request("GET", basepath, params, 400, session_error)

		# TEST 3
		print "TEST 3: Obtener lista de usuarios (proporcionando una cookie de sesion válida)"
		print " Status esperado: 200 (O 204 si la lista de usuarios está vacía)"
		test_utils.make_request("GET", basepath, params, 200, session1)

		# TESTs Relativos a la obtención de información sobre un usuario
		# TEST 4
		print "TEST 4: Obtener info de usuario, proporcionando una cookie de sesión (no existente en el sistema)"
		print "Status esperado: 404"
		request_uri = basepath + "/" + user_id_error
		test_utils.make_request("GET", request_uri, params, 404, session1)

		# TEST 5
		print "TEST 5: Obtener info de usuario, caso obtención de información pública de un usuario en concreto"
		print "(proporcionando una cookie de sesión diferente al recurso usuario solicitado)"
		print "Status esperado: 200"
		request_uri = basepath + "/" + user_id1
		test_utils.make_request("GET", request_uri, params, 200, session2)

		# TEST 6
		print "TEST 6: Obtener info de usuario, caso obtención de información privada de un usuario en concreto"
		print "(cookie de sesión coincide con recurso usuario solicitado)"
		print "Status esperado: 200"
		request_uri = basepath + "/" + user_id1
		test_utils.make_request("GET", request_uri, params, 200, session1)

		# Tests de obtención de info de usuario sin cookie de sesión
		# TEST 7
		print "TEST 7: Obtener info de usuario, sin proporcionar cookie de sesión"
		print "Status esperado: 200 (Respuesta vacía)"
		request_uri = basepath + "/" + user_id1
		test_utils.make_request("GET", request_uri, params, 200, None)

		#TEST 8
		print "TEST 8: Obtener info de un usuario no existente en el sistema, sin proporcionar cookie de sesión"
		print "Status esperado: 404"
		request_uri = basepath + "/" + user_id_error
		test_utils.make_request("GET", request_uri, params, 404, None)

		# TESTs Relativos a la Modificación de información de un usuario en particular
		# TEST 9
		print "TEST 9: Modificar info de usuario 1 (sin cookie de sesión)"
		print "Status esperado: 401"
		request_uri = basepath + "/" + user_id1
		test_utils.make_request("POST", request_uri, params, 401, None)

		# TEST 10
		print "TEST 10: Modificar info de usuario 1 (Con cookie de sesión distinta a la del recurso usuario)"
		print "Status esperado: 401"
		request_uri = basepath + "/" + user_id1
		test_utils.make_request("POST", request_uri, params, 401, session2)

		# TEST 11
		print "TEST 11: Modificar info de usuario no existente en el sistema"
		print "Status esperado: 404"
		request_uri = basepath + "/" + user_id_error
		test_utils.make_request("POST", request_uri, params, 404, session2)

		# TEST 12
		print "TEST 12: Modificar info de usuario 1, caso parámetros incorrectos (Cookie de sesión correcta)"
		print "Status esperado: 304 (El recurso no se modifica)"
		request_uri = basepath + "/" + user_id1
		params = urllib.urlencode({"badParam": "valueERROR"})
		test_utils.make_request("POST", request_uri, params, 304, session1)

		# TEST 13
		print "TEST 13: Modificar info de usuario 1, sin proporcionar parámetros (Cookie de sesión correcta)"
		print "Status esperado: 304 (El recurso no se modifica)"
		params = urllib.urlencode({})
		test_utils.make_request("POST", request_uri, params, 304, session1)

		# TEST 14
		print "TEST 14: Modificar info de usuario, caso modificar todos los campos del usuario 2, cambiando ámbito de email y teléfono a privado"
		print "(cookie de sesión correcta)"
		print "Status esperado: 200 (Se modifican todos los campos del usuario)"
		request_uri = basepath + "/" + user_id2
		params = urllib.urlencode({'description': 'Metric Lover',
			'website': 'PicBit.es',
			'image': 'unsplash.com/superCoolImage.jpeg',
			'phone': 911235813,
			'email': 'deus@PicBit.es',
			'private_phone': 'True',
			'private_email': 'True'})
		test_utils.make_request("POST", request_uri, params, 200, session2)

		# Comprobamos caso de uso de obtención de información privada de usuario
		# TEST 15
		print "TEST 15: Obtener info de usuario 2, (cookie de sesión distinta al recurso solicitado)"
		print "Status esperado: 200 (No deben aparecer los campos correspondientes al teléfono y email)"
		request_uri = basepath + "/" + user_id2
		params = urllib.urlencode({})
		test_utils.make_request("GET", request_uri, params, 200, session1)

		# TEST 16
		print "TEST 16: Obtener info de usuario 2 (usuario activo solicita su propia información)"
		print "Status esperado: 200"
		# params = urllib.urlencode({})
		test_utils.make_request("GET", request_uri, params, 200, session2)

		# Cambiamos el ámbito de campos de usuario a público
		# TEST 17
		print "TEST 17: Cambiar info de usuario 2, caso cambiar a ámbito privado el email y telefono de usuario (cookie de sesión correcta)"
		print "Status esperado: 200"
		params = urllib.urlencode({'private_phone': 'True',
			'private_email': 'True'})
		test_utils.make_request("POST", request_uri, params, 200, session2)

		# TEST 18
		print "TEST 18: Obtener lista de usuarios (proporcionando una cookie de sesion válida)"
		print " Status esperado: 200 (el usuario 2 no debe mostrar los campos correspondientes al email y a teléfono)"
		params = urllib.urlencode({})
		test_utils.make_request("GET", basepath, params, 200, session1)

		# POSTESTs: Cierre de sesión con Google+ en el sistema
		request_uri = '/api/oauth/googleplus/logout'
		params = urllib.urlencode({})
		print "POSTEST 1: Logout de usuario 1 en el sistema"
		print "Ignorar el status de este caso"
		test_utils.make_request("POST", request_uri, params, 200, session1, True)

		print "POSTEST 2: Logout de usuario 2 en el sistema"
		print "Ignorar el status de este caso"
		test_utils.make_request("POST", request_uri, params, 200, session2, True)

	elif option == 'borrado':

		# TESTs Relativos a la eliminación de un usuario del sistema
		# TEST 19
		print "TEST 19: Borrar usuario del sistema (cookie de sesión incorrecta)"
		print "Status esperado: 400"
		request_uri = basepath + "/" + user_id1
		params = urllib.urlencode({})
		test_utils.make_request("DELETE", request_uri, params, 400, session_error)

		# TEST 20
		print "TEST 20: Borrar usuario el sistema (usuario no existente en el sistema)"
		print "Status esperado: 404"
		request_uri = basepath + "/" + user_id_error
		params = urllib.urlencode({})
		test_utils.make_request("DELETE", request_uri, params, 404, session1)

		# TEST 21
		print "TEST 21: Borrar usuario 1 del sistema (cookie de sesión incorrecta)"
		print "Status esperado: 401"
		request_uri = basepath + "/" + user_id1
		params = urllib.urlencode({})
		test_utils.make_request("DELETE", request_uri, params, 401, session2)

		# TEST 22
		print "TEST 22: Borrar usuario 1 del sistema (cookie de sesión correcta)"
		print "Status esperado: 204. La cookie de sesión se invalida y se realiza logout del usuario en el sistema"
		request_uri = basepath + "/" + user_id1
		params = urllib.urlencode({})
		test_utils.make_request("DELETE", request_uri, params, 204, session1)

		# TEST 23
		print "TEST 23: Borrar usuario 1 del sistema (usuario ya borrado del sistema)"
		print "Status esperado: 400 (La cookie proporcionada no corresponde con ningún usuario del sistema)"
		request_uri = basepath + "/" + user_id1
		params = urllib.urlencode({})
		test_utils.make_request("DELETE", request_uri, params, 400, session1)

		# TEST 24
		print "TEST 24: Obtener la lista de usuarios del sistema, para verificar que se ha eliminado el usuario"
		print "Status esperado: 200"
		request_uri = basepath
		params = urllib.urlencode({})
		test_utils.make_request("GET", request_uri, params, 200, session2)

		# TEST 25
		print "TEST 25: Borrar usuario 2 del sistema"
		print "Status esperado: 204"
		request_uri = basepath + "/" + user_id2
		params = urllib.urlencode({})
		test_utils.make_request("DELETE", request_uri, params, 204, session2)

		# TEST 26
		print "TEST 26: Obtener la lista de usuarios del sistema, " + \
		"para verificar que se ha invalidado la cookie de sesión del usuario tras su borrado del sistema"
		print "Status esperado: 400"
		request_uri = basepath
		params = urllib.urlencode({})
		test_utils.make_request("GET", request_uri, params, 400, session2)


	# Cerramos conexión e imprimimos el ratio de test ok vs erróneos
	test_utils.closeConnection()
	test_utils.tests_status()

if __name__ == "__main__":
    main()
