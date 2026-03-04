# Diseno metodologico del proceso KDD

El diseno metodologico de esta investigacion se estructura con base en el proceso KDD (Knowledge Discovery in Databases), entendido como una secuencia racional de decisiones para transformar datos en conocimiento util. Su adopcion no responde solo a una preferencia tecnica, sino a una necesidad epistemologica: garantizar que cada resultado del estudio pueda justificarse por el camino metodologico que lo produjo.

En este marco, KDD se asume como un proceso iterativo. Cada fase produce insumos para la siguiente, pero tambien genera evidencia para retroceder y ajustar decisiones previas cuando aparecen sesgos, perdida de representatividad o inconsistencias en el desempeno. Esta logica de retroalimentacion es la que sostiene la validez del estudio.

## Fase I. Seleccion y comprension de datos

La primera fase se orienta a responder una pregunta central: que datos son metodologicamente pertinentes para representar el fenomeno de interes. En esta investigacion, el fenomeno observado es el estado fitosanitario de la hoja de frijol; por tanto, la unidad de analisis no es la imagen completa, sino la hoja como objeto biologicamente significativo para el diagnostico.

La seleccion de datos se argumento bajo tres criterios. Primero, relevancia diagnostica: los datos debian contener informacion visual asociada a patrones de sanidad y enfermedad. Segundo, variabilidad contextual: se priorizaron muestras con cambios de iluminacion, fondo y escala para evitar un modelo sobreajustado a condiciones controladas. Tercero, complementariedad funcional: se reconocio que el problema exigia tanto localizacion del objeto (deteccion) como decision de clase (clasificacion).

La comprension de datos, ademas, permitio identificar asimetrias entre clases y heterogeneidad de calidad en las capturas. Este hallazgo justifico que el resto del proceso no se limitara a entrenar modelos, sino que incorporara estrategias de control de calidad y balance para preservar la validez interna.

## Fase II. Preprocesamiento y aseguramiento de calidad

El preprocesamiento se diseno para disminuir ruido, reducir sesgos y aumentar la consistencia estadistica del conjunto de datos. Metodologicamente, esta fase se fundamenta en que un modelo no corrige defectos estructurales de datos; por el contrario, tiende a amplificarlos.

La primera decision fue depurar y estandarizar muestras, con el fin de evitar que informacion irrelevante dominara el aprendizaje. La segunda decision fue aislar regiones de interes, de manera que la clasificacion se apoyara en evidencia visual de la hoja y no en el contexto del fondo. La tercera decision fue fortalecer la representatividad de la clase minoritaria mediante aumento de datos, para evitar que la frecuencia de clase definiera artificialmente el criterio del modelo.

Un punto critico fue el control de duplicados entre subconjuntos. Este control se argumento como condicion de validez metodologica, porque la presencia de imagenes repetidas entre entrenamiento y prueba produciria metricas infladas y conclusiones enganosas. En consecuencia, la limpieza y auditoria de duplicados se asumieron como parte de la garantia experimental, no como una tarea operativa secundaria.

## Fase III. Transformacion de datos

La transformacion consistio en convertir el conjunto depurado en una estructura apta para aprendizaje y evaluacion reproducible. Desde el diseno metodologico, esta fase busca asegurar equivalencia de condiciones entre experimentos, de modo que cualquier diferencia observada pueda atribuirse al modelo y no a variaciones del dato de entrada.

La particion en entrenamiento, validacion y prueba se planteo con criterio estratificado y semilla fija. El fundamento de esta decision es doble: mantener la distribucion de clases en todos los subconjuntos y permitir que el experimento sea replicable por terceros. Sin estas condiciones, la comparacion de resultados perderia fuerza inferencial.

Adicionalmente, se aplicaron transformaciones de formato y normalizacion coherentes con los requerimientos de modelos de vision por computador. Esta coherencia tecnica es metodologicamente relevante porque evita introducir sesgos por incompatibilidades de preprocesado entre entornos de entrenamiento y evaluacion.

## Fase IV. Mineria de datos

La mineria de datos se estructuro como una arquitectura secuencial de dos tareas: deteccion de hojas y clasificacion sanitaria. Esta decision no fue solo computacional; responde a un argumento metodologico de descomposicion del problema. Al separar localizacion y clasificacion, cada subtarea se entrena con objetivos claros, variables de error diferenciadas y metricas especificas.

La fase de deteccion se justifica porque delimita el objeto biologico antes de inferir su estado. Sin esta etapa, la clasificacion operaria sobre senales mixtas (hoja + fondo), debilitando la relacion causal entre patron visual y diagnostico. En terminos metodologicos, la deteccion actua como mecanismo de control de ruido y mejora la interpretabilidad del pipeline.

Para la clasificacion, el diseno incluyo una comparacion entre dos entornos de modelado bajo condiciones equivalentes de particion y arquitectura base. La argumentacion de esta comparacion es garantizar justicia experimental: si cambian simultaneamente datos, arquitectura y framework, la atribucion de resultados se vuelve ambigua. Mantener condiciones controladas permite evaluar con mayor rigor la relacion entre desempeno predictivo y costo inferencial.

## Fase V. Evaluacion e interpretacion

La evaluacion se concibio como contraste multidimensional y no como revision de una sola metrica. En clasificacion se analizaron exactitud, precision, sensibilidad, F1 y AUC para distinguir entre desempeno global, capacidad de deteccion de positivos y estabilidad ante desbalance. En deteccion se incorporaron indicadores de localizacion que permiten juzgar si las regiones entregadas al clasificador son suficientemente confiables.

El uso de matrices de confusion y curvas ROC se fundamento en su valor interpretativo: permiten observar tipos de error, umbrales de decision y compromisos entre falsos positivos y falsos negativos. Esta lectura cualitativa complementa las metricas agregadas y evita conclusiones simplificadas.

Tambien se incluyo la latencia de inferencia como criterio metodologico de decision. La razon es que, en un sistema aplicado, un modelo no solo debe clasificar bien; debe hacerlo en tiempos compatibles con uso operativo. Por ello, la seleccion final del enfoque se sustenta en un equilibrio entre calidad predictiva, estabilidad y viabilidad de implementacion.

## Integracion metodologica del proceso

La coherencia del diseno KDD se sostiene en la articulacion entre fases. La calidad de la evaluacion depende de la calidad del preprocesamiento; la validez de la comparacion depende de la transformacion reproducible; y la interpretacion final depende de haber definido, desde la fase inicial, una unidad de analisis consistente con el problema biologico.

En consecuencia, el aporte metodologico del proceso no radica en una fase aislada, sino en la cadena completa de decisiones justificadas que conecta seleccion de datos, control de calidad, modelado especializado y evaluacion criterial.
