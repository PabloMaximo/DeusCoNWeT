camino(arbol1, arbol2, 18).
camino(arbol2, arbol3, 12).
camino(arbol1, arbol3, 19).
camino(arbol4, arbol3, 8).
camino(arbol4, arbol2, 20).

camino(arbol1, 13).
camino(arbol2, 19).
camino(arbol3, 22).
camino(arbol4, 34).

necesita(arbol1, 2).
necesita(arbol2, 1).
necesita(arbol3, 2).
necesita(arbol4, 4).

capacidad(5).

riego(T):-
	rutas(T),
	noRepite(T),
	vaVacio(T),
	tardaMas(T).