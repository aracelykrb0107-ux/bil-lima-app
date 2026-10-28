// ============================================================
// data.js — Modelo de madurez BIL-Lima
// Es el ÚNICO archivo que hay que editar para cambiar el modelo.
// Generado con herramientas/fichas_a_data.py a partir de las fichas
// de los subatributos (Bloques B y C). Puede editarse a mano.
//
// Estructura:
//   meta: nombre, version, fecha, niveles[5]
//   atributos[] -> { codigo, nombre_en, nombre_es, subatributos[] }
//   subatributos[] -> { codigo, nombre_en, nombre_es, descripcion,
//                       descriptores[5] (N1..N5), componentes[] }
//   componentes[] -> { codigo, nombre, niveles[5] }  (N1..N5)
//   cada nivel -> { e: estado, t: texto entre paréntesis }
//     e = "●" se exige en ese nivel (casilla de verificación)
//         "○" presupuesto por acumulación   "·" aún no exigido
//         "-" sin contenido
// ============================================================
window.BIL_DATA = {
 "meta": {
  "nombre": "Modelo de madurez BIL-Lima (BIM, IPD y Lean Construction)",
  "version": "BIL-Lima v1 (preliminar)",
  "fecha": "2026-10-28",
  "niveles": [
   {
    "n": 1,
    "nombre": "Initial (individual)"
   },
   {
    "n": 2,
    "nombre": "Repeatable (project)"
   },
   {
    "n": 3,
    "nombre": "Defined (organization and project)"
   },
   {
    "n": 4,
    "nombre": "Quantitatively managed (full organization awareness)"
   },
   {
    "n": 5,
    "nombre": "Optimizing (cross-organization integration)"
   }
  ]
 },
 "atributos": [
  {
   "codigo": "1",
   "nombre_en": "Customer Focus",
   "nombre_es": "Enfoque en el cliente",
   "subatributos": [
    {
     "codigo": "1.1",
     "nombre_en": "Adaptive Multi skilled people",
     "nombre_es": "Personal multicompetente adaptativo",
     "descripcion": "capacidad de la empresa para reasignar a su personal propio ante los cambios del cliente y los requisitos de información del proyecto. La reasignación se apoya en la polivalencia del personal, se activa mediante los mecanismos formales de cambio y queda registrada en el entorno digital del proyecto.",
     "descriptores": [
      "La reasignación del personal ante un cambio del cliente depende de la iniciativa del residente o del capataz y se resuelve sobre la marcha. La empresa desconoce qué trabajadores dominan más de un oficio y no retiene personal de una obra a otra. El cambio se ejecuta sin acuerdo previo sobre su pago o la obra se detiene mientras se discute. La reasignación no queda registrada.",
      "Cuando el cliente introduce un cambio, la planificación intermedia (lookahead) del proyecto reprograma las cuadrillas entre frentes. El equipo repite esa forma de proceder en obras similares y suele trasladar a ellas la misma cuadrilla. La reasignación aprovecha a los trabajadores que dominan más de un oficio por experiencia, aunque esa polivalencia no está registrada ni certificada. La aprobación y el pago del cambio se tramitan caso por caso.",
      "La empresa establece un procedimiento de reasignación ante los cambios del cliente que cada proyecto adapta a sus características. Registra las competencias de su personal propio, promueve su certificación en varios oficios y roles BIM y retiene un núcleo estable de trabajadores entre obras. Sus contratos incluyen la alerta temprana y una Oficina Técnica tramita cada cambio como adicional con etapas y plazos definidos. El efecto del cambio sobre las cuadrillas se revisa en el modelo BIM y la reasignación queda registrada en el entorno común de datos.",
      "La empresa mide la reasignación del personal con métricas definidas y compara los resultados con lo esperado para hallar brechas. Entre esas métricas figuran el tiempo que transcurre entre la alerta de un cambio y la reasignación de las cuadrillas, el cumplimiento de lo planificado después del cambio y el plazo de aprobación de los adicionales. También mide la proporción del personal propio certificado en más de un oficio o rol BIM y su permanencia entre obras. El registro del entorno común de datos alimenta esas mediciones, que se analizan en toda la organización.",
      "Cliente, contratista y proyectista deciden juntos los cambios que implican reasignar personal en una instancia formal y periódica, bajo una alerta temprana que obliga a todas las partes. El registro de cambios y reasignaciones en el entorno común de datos es accesible a todas ellas y sirve de base para revisar de forma continua las brechas. Las partes identifican sus causas raíz y ajustan las soluciones. Lo aprendido mejora el procedimiento de reasignación, el desarrollo de competencias y la retención del personal en los proyectos siguientes."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Reprogramación del personal ante un cambio",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "lookahead del proyecto"
        },
        {
         "e": "●",
         "t": "procedimiento de la empresa adaptado a cada proyecto"
        },
        {
         "e": "●",
         "t": "tiempo de reasignación y cumplimiento tras el cambio"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Polivalencia certificada del personal propio",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "por experiencia, sin registro"
        },
        {
         "e": "●",
         "t": "registro de competencias y certificación"
        },
        {
         "e": "●",
         "t": "proporción certificada"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Núcleo estable de personal propio entre obras",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "la misma cuadrilla en obras similares"
        },
        {
         "e": "●",
         "t": "política de retención de la empresa"
        },
        {
         "e": "●",
         "t": "permanencia medida"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Cláusula de alerta temprana",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "en los contratos de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "obligación recíproca entre las partes"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Oficina Técnica que convierte cambios en adicionales",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "trámite caso por caso"
        },
        {
         "e": "●",
         "t": "etapas y plazos definidos"
        },
        {
         "e": "●",
         "t": "plazo de aprobación"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Decisión conjunta sobre cambios durante la ejecución",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "instancia formal y periódica"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Análisis en el modelo del efecto del cambio sobre el personal",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "efecto en cuadrillas y horas-hombre"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Registro del cambio y de la reasignación en el entorno común de datos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "registro del cambio y la reasignación"
        },
        {
         "e": "●",
         "t": "fuente de las mediciones"
        },
        {
         "e": "●",
         "t": "accesible a las partes, base de la revisión conjunta"
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Polivalencia del personal en usos y roles BIM",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "más de un uso o rol BIM"
        },
        {
         "e": "●",
         "t": "proporción medida"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    },
    {
     "codigo": "1.2",
     "nombre_en": "Optimising Value",
     "nombre_es": "Optimización del valor",
     "descripcion": "capacidad de la empresa para definir formalmente el valor para su cliente antes del diseño, validarlo antes de cerrarlo y ajustarlo con la información de sus proyectos entregados. Cuando no hay comprador identificado, la empresa precisa quién representa al cliente (el perfil del comprador, la postventa o el Estado en vivienda social). Incluye la atención a los subcontratistas y proveedores de la cadena como clientes internos.",
     "descriptores": [
      "El valor para el cliente no se define ni se comunica de manera formal y depende del criterio del proyectista o del gerente. Cuando no hay comprador identificado, nadie precisa quién representa al cliente. El diseño se cierra sin comparar alternativas y los costos se recortan en obra. Los reclamos de postventa no vuelven al diseño y los subcontratistas reciben el cronograma con poca anticipación.",
      "Los proyectos similares se asumen con el mismo valor y repiten las estrategias que funcionaron antes. En el proyecto, el equipo elabora un programa de necesidades, compara algunas alternativas, aplica ingeniería de valor y apoya la representación del cliente en un estudio de mercado. Los reclamos de un proyecto entregado se consideran en el siguiente sin clasificarse. La atención a los subcontratistas depende de cada obra.",
      "La empresa define el valor de todo el proyecto antes del diseño y lo comunica a sus clientes internos y externos. Precisa quién representa al cliente sin comprador identificado, documenta sus requerimientos y fija un costo objetivo. Compara alternativas con criterios ponderados y con su costo obtenido del modelo BIM, aplica ingeniería de valor y valida el diseño con el cliente en sesiones ICE. Clasifica la postventa para los proyectos siguientes. Con sus subcontratistas aplica un protocolo de atención, define requisitos de información y asume obligaciones recíprocas.",
      "La empresa establece métricas para medir el valor capturado y compara cuantitativamente los resultados reales con los valores definidos por el cliente para hallar brechas. Mide el costo final frente al costo objetivo, la proporción y el tipo de reclamos de postventa frente a lo prometido y el cumplimiento de lo planificado por sus subcontratistas. Los resultados se analizan en toda la organización y orientan los requerimientos de los proyectos siguientes.",
      "Cliente, proyectistas, contratista, subcontratistas y proveedores clave se integran desde la planificación temprana y acuerdan el valor de cada etapa del proyecto. El costo objetivo se fija entre las partes, que comparten riesgos y beneficios y resuelven juntas las barreras contractuales. Costo, plazo y coordinación se vinculan al modelo BIM compartido. Toda la cadena revisa de forma continua las brechas de valor, identifica sus causas raíz y ajusta las soluciones, de modo que maximizar el valor es un objetivo colectivo."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Estudio formal de alternativas de diseño",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "alternativas comparadas en el proyecto"
        },
        {
         "e": "●",
         "t": "matriz con criterios ponderados establecida por la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Representación del cliente cuando no hay comprador identificado",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "estudio de mercado del proyecto"
        },
        {
         "e": "●",
         "t": "perfil del comprador, QFD o requisitos del Estado definidos por la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Ingeniería de valor durante el diseño",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "aplicada en un proyecto"
        },
        {
         "e": "●",
         "t": "práctica establecida en el diseño"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Postventa como insumo de diseño",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "reclamos considerados en un proyecto similar, sin clasificar"
        },
        {
         "e": "●",
         "t": "registro clasificado incorporado a los requerimientos"
        },
        {
         "e": "●",
         "t": "proporción y tipo de reclamos frente a lo prometido"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L5",
       "nombre": "Protocolo de atención a la cadena como cliente interno",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "según cada obra"
        },
        {
         "e": "●",
         "t": "procedimiento propio aplicado en todos los proyectos"
        },
        {
         "e": "●",
         "t": "cumplimiento de lo planificado por los subcontratistas"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Costo objetivo que guía el diseño",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "fijado por la empresa antes de diseñar"
        },
        {
         "e": "●",
         "t": "costo final frente al objetivo"
        },
        {
         "e": "●",
         "t": "acordado entre las partes, con riesgos y beneficios compartidos"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Sesiones ICE con el cliente para validar el valor",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "validación con el cliente antes de cerrar el diseño"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "valor acordado entre las partes en cada etapa"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Incorporación temprana de subcontratistas y proveedores clave",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "equipo integrado desde la planificación"
        }
       ]
      },
      {
       "codigo": "I4",
       "nombre": "Compromisos recíprocos de la contratista hacia la cadena",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "obligaciones de la contratista en sus subcontratos"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "barreras contractuales resueltas entre las partes"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Requerimientos formales del cliente antes del diseño",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "programa de necesidades del proyecto, sin formato establecido"
        },
        {
         "e": "●",
         "t": "documento de requerimientos o requisitos de información"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Evaluación económica de las alternativas con el modelo (BIM 5D)",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "costo de cada alternativa obtenido del modelo"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "costo, plazo y coordinación vinculados al modelo compartido"
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Requisitos de información definidos para cada subcontrato",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "requisitos de intercambio en cada subcontrato"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    },
    {
     "codigo": "1.3",
     "nombre_en": "Adaptive Budget",
     "nombre_es": "Presupuesto adaptativo",
     "descripcion": "capacidad de la empresa para asignar presupuesto a los recursos que el modelo requiere (personal polivalente y de coordinación, espacios colaborativos y herramientas digitales) y para revisarlo y reasignarlo ante los cambios del cliente. En el nivel más alto, esa revisión se realiza entre todas las partes del proyecto con reglas contractuales de reparto.",
     "descriptores": [
      "Los recursos que sostienen el trabajo colaborativo no tienen financiamiento abierto. El personal de coordinación se cubre con el margen o con personal prestado de otras obras, los espacios de trabajo conjunto se improvisan y las licencias y equipos dependen de lo que cada área consiga. El presupuesto solo se revisa al cierre de mes y cada cambio se discute como un adicional aislado.",
      "El proyecto financia al personal de coordinación, el espacio de trabajo conjunto y las herramientas digitales que necesita, y se asume que proyectos similares requerirán lo mismo. El equipo contrasta el presupuesto con el avance semanal de la producción para reasignar recursos a tiempo. Las partidas dependen de cada obra y no de una política de la empresa.",
      "La empresa financia de forma estable al personal de coordinación, los espacios colaborativos y el hardware, software y red, y adapta esas partidas a cada proyecto. Prevé el costo de cumplir los requisitos de información, revisa el presupuesto con la planificación semanal y lo reestima desde el modelo BIM ante cada cambio. Sus contratos con el cliente incluyen un precio objetivo con reparto de ahorros y sobrecostos y una junta que resuelve las controversias sin paralizar la obra.",
      "La empresa analiza el costo-beneficio del personal de coordinación, de los espacios colaborativos y de las tecnologías que financia con datos sobre el desempeño de sus procesos. Mide las desviaciones del presupuesto frente al avance, la variación entre la reestimación del modelo y el costo real y el costo final frente al precio objetivo. Los resultados se comparan con lo esperado para hallar brechas en toda la organización.",
      "Cliente, proyectistas, contratista y subcontratistas estiman y revisan de forma continua el presupuesto del proyecto con una regla acordada para reasignarlo. El presupuesto sostiene las prácticas Lean, los requisitos de IPD, las plataformas abiertas acordadas entre las partes (OpenBIM) y la decisión conjunta sobre los requisitos de información. Las partes identifican las brechas, comunican sus causas raíz y ajustan las soluciones."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Financiamiento del personal de coordinación y producción colaborativa",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "partida del proyecto"
        },
        {
         "e": "●",
         "t": "partida estable de la empresa, adaptada a cada proyecto"
        },
        {
         "e": "●",
         "t": "costo-beneficio del personal de coordinación"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Financiamiento de los espacios colaborativos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "habilitados con fondos del proyecto"
        },
        {
         "e": "●",
         "t": "partida estable de la empresa"
        },
        {
         "e": "●",
         "t": "costo-beneficio de los espacios"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Presupuesto revisado con la planificación de corto plazo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "contraste semanal en el proyecto"
        },
        {
         "e": "●",
         "t": "procedimiento de la empresa"
        },
        {
         "e": "●",
         "t": "desviaciones medidas frente al avance"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Precio objetivo con reparto de ahorros y sobrecostos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "en los contratos de la empresa con el cliente"
        },
        {
         "e": "●",
         "t": "costo final frente al precio objetivo"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Revisión del presupuesto entre todas las partes del proyecto",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "con proyectistas y subcontratistas, bajo una regla acordada"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Continuidad ante controversias sobre el costo de los cambios",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "junta prevista en el contrato"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Reestimación del presupuesto con el modelo ante un cambio",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "reestimación desde el modelo"
        },
        {
         "e": "●",
         "t": "variación entre la reestimación y el costo real"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Financiamiento de hardware, software y red",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "herramientas financiadas por el proyecto"
        },
        {
         "e": "●",
         "t": "partida estable de la empresa, ajustada por proyecto"
        },
        {
         "e": "●",
         "t": "costo-beneficio de las tecnologías"
        },
        {
         "e": "●",
         "t": "herramientas y plataformas abiertas acordadas entre las partes"
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Presupuesto vinculado a los requisitos de información",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "costo previsto para los requisitos de información"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "decisión conjunta de las partes sobre los requisitos de información"
        }
       ]
      }
     ]
    },
    {
     "codigo": "1.4",
     "nombre_en": "Adaptive Physical facilities",
     "nombre_es": "Instalaciones físicas adaptativas",
     "descripcion": "capacidad de la empresa para habilitar y operar espacios de trabajo conjunto donde el cliente, las especialidades y la producción toman decisiones con una frecuencia definida. Esos espacios se adaptan a la etapa y la escala del proyecto y se apoyan en un acuerdo contractual y en el modelo federado.",
     "descriptores": [
      "La empresa no habilita un espacio de trabajo conjunto ni facilita la decisión colaborativa con el cliente. Las especialidades revisan sus modelos por separado y reportan las interferencias después, en reuniones convocadas según la urgencia. Las decisiones dependen de quién asiste y se derivan a intercambios posteriores, mientras el personal de producción solo recibe sus resultados.",
      "El proyecto habilita un espacio de trabajo conjunto según lo que funcionó en proyectos similares, por lo general durante la fase de diseño. Allí se reúnen las especialidades y el cliente en sesiones programadas y trabajan sobre los modelos BIM para identificar interferencias. La organización y otros requisitos limitan la flexibilidad del espacio, que suele cerrarse al terminar el diseño.",
      "La empresa establece espacios de trabajo conjunto que cada proyecto adapta a su etapa y escala, en modalidad presencial, híbrida o virtual. Las sesiones tienen una frecuencia y una agenda definidas, resuelven las interferencias en la propia sesión e incluyen a residentes e ingenieros de campo. El espacio acompaña al proyecto hasta la obra. Cuenta con pantallas, conectividad y acceso al entorno común de datos, y cada especialidad actualiza su modelo antes de la sesión. La co-localización figura en los contratos de la empresa.",
      "La empresa mide con métricas definidas el funcionamiento de sus espacios de trabajo conjunto: la asistencia por sesión, las interferencias resueltas dentro de la sesión, la participación del personal de producción y la adecuación del equipamiento para el uso de BIM y Lean. Compara los resultados con lo esperado y con los requisitos del cliente para hallar brechas en toda la organización.",
      "El Big Room es un entorno flexible de co-localización para todas las partes IPD, establecido en el contrato. Las partes acuerdan la modalidad y el alcance de la co-localización, a tiempo parcial o completo, según la escala del proyecto, y deciden con un protocolo conjunto. La colaboración continua permite analizar con rapidez todas las disciplinas y evaluar la conformidad con los requisitos del cliente. Las partes identifican las brechas, comunican sus causas raíz y ajustan las soluciones."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Espacio de co-localización con participación interdisciplinaria y capacidad de decisión",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "habilitado para el proyecto, en la fase de diseño"
        },
        {
         "e": "●",
         "t": "establecido por la empresa y adaptado a cada proyecto"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Frecuencia definida de sesiones y resolución dentro de la sesión",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "sesiones programadas en el proyecto"
        },
        {
         "e": "●",
         "t": "frecuencia y agenda establecidas por la empresa"
        },
        {
         "e": "●",
         "t": "asistencia e interferencias resueltas por sesión"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Participación del personal de producción en el espacio",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "residentes e ingenieros de campo en las sesiones"
        },
        {
         "e": "●",
         "t": "participación medida"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Continuidad del espacio desde el diseño hasta la obra",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "el espacio acompaña al proyecto en obra"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Respaldo contractual de la co-localización",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "co-localización en los contratos de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "co-localización de las partes IPD establecida en el contrato"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Protocolo de decisión conjunta dentro del espacio",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "protocolo acordado entre las partes"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Modalidad acordada según la escala del proyecto",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "modalidad definida según la escala del proyecto"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "modalidad y alcance acordados entre las partes"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Modelo federado operado en vivo durante la sesión",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "modelos BIM en las sesiones del proyecto"
        },
        {
         "e": "●",
         "t": "práctica establecida en todas las sesiones"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Equipamiento digital del espacio",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "pantallas, conectividad y acceso al CDE"
        },
        {
         "e": "●",
         "t": "adecuación del equipamiento medida"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Actualización del modelo antes de cada sesión",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "actualización con frecuencia acordada"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "codigo": "2",
   "nombre_en": "Culture and People",
   "nombre_es": "Cultura y personas",
   "subatributos": [
    {
     "codigo": "2.1",
     "nombre_en": "Contribution by staff at all levels",
     "nombre_es": "Contribución del personal en todos los niveles",
     "descripcion": "capacidad de la organización para captar, evaluar, implementar, reconocer y medir las propuestas de mejora de su personal en todos los niveles, incluidos capataces, obreros y subcontratistas. Las ideas se juzgan por su mérito y la información digital del proyecto está al alcance de todos.",
     "descriptores": [
      "La dirección define los objetivos y las tareas sin consultar a sus equipos y los comunica de arriba hacia abajo. No existe un canal para proponer mejoras y el obrero no encuentra cómo llegar a sus superiores. Las ideas dependen de la iniciativa de cada persona y los problemas se atribuyen a quien los comete.",
      "En el proyecto, las ideas se valoran por su contenido y no por el cargo de quien las propone. El capataz aporta en las reuniones de planificación como último planificador y el modelo BIM se usa en las sesiones de Pull Planning. Sin embargo, no hay un proceso sistemático para captar las propuestas, la dirección no las solicita y el aporte se pierde cuando el personal rota.",
      "La contribución de todo el personal forma parte de la cultura de la empresa y se adapta a cada proyecto. Un reglamento reconoce el derecho a proponer mejoras y un canal abierto recibe las propuestas de obreros, capataces, staff y subcontratistas. Cada propuesta sigue un proceso de evaluación con responsable asignado, se juzga por su mérito y su estado se comunica en la obra con reconocimiento a quien la formuló. El personal accede al entorno común de datos y registra sus observaciones sobre el modelo, al que se vinculan el LPS y el Pull Planning.",
      "La empresa mide cuántas propuestas recibe, qué proporción implementa y qué beneficio obtiene, desagregado por nivel del proponente. Las soluciones a los problemas identificados se documentan de forma sistemática y su seguimiento queda registrado sobre el modelo. Los resultados reales y los esperados se comparan con las métricas establecidas para hallar brechas, que se atienden en toda la organización.",
      "Todas las partes del proyecto valoran las ideas de su personal y de las demás partes, y las juzgan por su mérito. Diseñadores, contratista, subcontratistas y personal de campo trabajan en equipos multidisciplinarios con interacción continua y tratan los problemas como responsabilidad colectiva. El modelo BIM se usa en cada fase para apoyar el LPS, el Pull Planning y el Go Gemba. Las partes identifican los problemas por sus causas raíz, revisan las soluciones de forma continua y atienden las brechas."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Derecho formal a proponer mejoras",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "reglamento o política de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Canal de propuestas abierto a todos los niveles",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "reuniones de planificación del proyecto, hasta el capataz"
        },
        {
         "e": "●",
         "t": "canal abierto a obreros, staff y subcontratistas"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Proceso estandarizado de evaluación",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "etapas definidas con responsable asignado"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Visibilidad y reconocimiento de las propuestas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "estado comunicado y reconocimiento en la obra"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L5",
       "nombre": "Medición de resultados por nivel del proponente",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "propuestas recibidas, implementadas y beneficio por nivel"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Tratamiento colectivo de los problemas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "cultura de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "responsabilidad compartida entre todas las partes"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Equipos multidisciplinarios con interacción continua",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "diseñadores, contratista, subcontratistas y personal de campo"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Ideas juzgadas por su mérito y no por el rol de quien las propone",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "ideas valoradas por su contenido en el proyecto"
        },
        {
         "e": "●",
         "t": "criterios de evaluación independientes del cargo"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "ideas de las demás partes juzgadas por su mérito"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Uso del modelo por el personal de campo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "modelo en las sesiones de Pull Planning del proyecto"
        },
        {
         "e": "●",
         "t": "LPS y Pull Planning vinculados al modelo"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "modelo usado en cada fase por todas las partes"
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Entorno común de datos accesible a todos los involucrados",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "acceso de todos los niveles"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Propuestas registradas sobre el modelo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "observaciones asociadas al elemento"
        },
        {
         "e": "●",
         "t": "soluciones documentadas y seguidas hasta su cierre"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    },
    {
     "codigo": "2.2",
     "nombre_en": "Organisation training support",
     "nombre_es": "Soporte de capacitación organizacional",
     "descripcion": "capacidad de la organización para asignar recursos formales a la capacitación de su personal en gestión de producción Lean, entrega integrada y BIM/VDC. Los contenidos se diferencian por nivel e incluyen a los mandos de campo y al personal operativo. La formación se aplica en obra y se replica dentro de la empresa.",
     "descriptores": [
      "La capacitación del personal es escasa o inexistente y depende de la iniciativa de cada persona. La empresa no asigna tiempo ni presupuesto a la formación, y los métodos que usa no logran los resultados esperados. La formación en Lean, BIM o entrega integrada, cuando existe, llega solo a algunos profesionales y no alcanza a los mandos de campo ni al personal operativo.",
      "El proyecto asigna tiempo y presupuesto para capacitar a su personal en los aspectos de BIM, Lean e IPD que necesita, y esa capacitación se repite en proyectos similares. Algunos profesionales se certifican o asisten a cursos del mercado, el personal de obra recibe charlas en el frente y se aprovecha la oferta sectorial según lo que requiera la obra. La formación no sigue un plan de la empresa.",
      "La capacitación en BIM, Lean e IPD forma parte de la planificación de la empresa, incluye a los nuevos empleados y se adapta a cada proyecto. Una estructura formal de capacitación vincula la formación con la promoción del personal de obra y ofrece cursos de planificación y productividad a capataces, jefes de grupo y operarios, también en el frente antes de cada actividad. La empresa financia la certificación en BIM y VDC, sigue un plan BIM por niveles y entregables y replica la formación en cursos internos.",
      "La empresa mide la calidad de su capacitación con métricas establecidas: personal capacitado por nivel, promociones entre categorías y proporción de proyectos que alcanzan la meta de aplicación de lo aprendido. Las soluciones a los problemas identificados se documentan y se ponen a disposición del personal. Los resultados reales se comparan con los esperados para hallar brechas en toda la organización.",
      "Cliente, diseñadores, contratista y subcontratistas reciben al inicio una inducción conjunta en los métodos del proyecto y aprenden juntos mientras producen, con líderes que facilitan la transferencia de conocimiento entre empresas. La formación enseña a trabajar en un entorno altamente colaborativo y sin culpa. Las partes revisan y mejoran de forma continua la capacitación, identifican las brechas de los programas por sus causas raíz y ajustan las soluciones."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Estructura formal de capacitación vinculada a la promoción",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "unidad de formación de la empresa vinculada a la promoción"
        },
        {
         "e": "●",
         "t": "personal capacitado y promociones medidos"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Formación en planificación y productividad para mandos de campo y operativos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "curso puntual para el personal del proyecto"
        },
        {
         "e": "●",
         "t": "cursos dirigidos a capataces, jefes de grupo y operarios"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Capacitación aplicada en obra",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "charlas en el frente del proyecto"
        },
        {
         "e": "●",
         "t": "antes de cada actividad, como práctica de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Uso de la oferta sectorial de capacitación",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "inscripción según lo que requiera la obra"
        },
        {
         "e": "●",
         "t": "programa de la empresa que aprovecha la oferta sectorial"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Formación en entrega integrada y contratos colaborativos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "profesionales formados para un proyecto"
        },
        {
         "e": "●",
         "t": "parte de la planificación de la empresa, incluidos los nuevos empleados"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Aprendizaje conjunto del equipo integrado mientras produce",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "las partes aprenden juntas durante la ejecución"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Inducción conjunta de las partes en los métodos del proyecto",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "inducción de todas las partes al inicio"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Certificación de profesionales en BIM y VDC",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "certificación según las necesidades de un proyecto"
        },
        {
         "e": "●",
         "t": "certificación financiada por la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Plan de capacitación BIM por niveles y entregables",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "plan de la empresa por niveles y entregables"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Réplica interna de la formación BIM hacia otros niveles",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "cursos internos"
        },
        {
         "e": "●",
         "t": "proyectos que alcanzan la meta de aplicación"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    },
    {
     "codigo": "2.3",
     "nombre_en": "Upper level management buy in",
     "nombre_es": "Compromiso de la alta dirección",
     "descripcion": "capacidad de la alta dirección para patrocinar de forma institucionalizada las prácticas BIM, Lean e IPD mediante instancias de gobierno, unidades con mandato, metas corporativas, inversión sostenida y responsabilidades formalizadas. Ese patrocinio se mantiene frente a presiones de costo o plazo y no depende de una exigencia contractual puntual.",
     "descriptores": [
      "La alta dirección se resiste a cambiar la forma de trabajo y no patrocina BIM, Lean ni IPD. Su uso depende del entusiasmo de algunos gerentes de proyecto o de una exigencia puntual del cliente o de la norma. No existen instancias, metas ni recursos de la empresa para estas prácticas, que se suspenden ante la primera presión de plazo o costo.",
      "La alta dirección acepta algunos cambios para implementar BIM y Lean en un proyecto, a menudo por presión del cliente, y aprueba los recursos para un piloto. El equipo del proyecto mantiene esas prácticas bajo presión de plazo o costo y la experiencia se repite en proyectos similares, sin un mandato de la empresa.",
      "La alta dirección adopta BIM, Lean y algunos principios de IPD y dota a la organización de la infraestructura, la planificación y la capacitación necesarias. Un comité del Directorio gobierna la innovación, una unidad ejecutiva tiene mandato sobre estas prácticas y un responsable designado conduce la adopción BIM bajo una política aprobada. La dirección fija metas de implementación, invierte de forma sostenida, mantiene las iniciativas en periodos de crisis y acepta contratos de costo objetivo o reembolsable con incentivos.",
      "La dirección analiza el costo-beneficio de la implementación de BIM, Lean e IPD y establece métricas cuantitativas para medir su calidad. Sigue y reporta el cumplimiento de las metas corporativas de implementación en sus proyectos. Los resultados reales se comparan con los esperados para hallar brechas en toda la organización.",
      "La alta dirección de cada socio del proyecto adopta BIM y Lean para atender los principios de IPD y participa con el cliente y el diseñador en un comité ejecutivo conjunto. BIM se incorpora al contrato como la tecnología del proyecto y el intercambio abierto de sus datos se acuerda entre todas las partes en todas las fases. Cada empresa vincula su utilidad al resultado conjunto. Las partes identifican las brechas por sus causas raíz y ajustan las soluciones."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Instancia de gobierno de la innovación a nivel del Directorio",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "comité con mandato, reglamento y sesiones periódicas"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Unidad ejecutiva con mandato formal para BIM, Lean y procesos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "gerencia con responsabilidad sobre toda la organización"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Inversión sostenida en la implementación",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "recursos aprobados para un piloto"
        },
        {
         "e": "●",
         "t": "consultoría, pilotos y reingeniería de forma continua"
        },
        {
         "e": "●",
         "t": "costo-beneficio de la implementación"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Continuidad de las prácticas bajo presión de plazo o costo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "el proyecto mantiene la práctica bajo presión"
        },
        {
         "e": "●",
         "t": "la dirección sostiene las iniciativas en periodos de crisis"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Estrategia corporativa con metas de implementación y seguimiento directivo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "metas de implementación fijadas por la dirección"
        },
        {
         "e": "●",
         "t": "cumplimiento medido y reportado"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Comité ejecutivo con participación de las partes del proyecto",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "alta dirección con el cliente y el diseñador"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Disposición de la dirección a vincular el resultado económico de la empresa al del proyecto",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "acepta contratos de costo objetivo o reembolsable con incentivos"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "utilidad agrupada entre los socios"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Designación formal del responsable de la adopción BIM",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "designado con mandato de la máxima autoridad"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Inversión corporativa en infraestructura tecnológica",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "equipamiento, espacios y licencias de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Respaldo directivo a la política BIM y al plan de ejecución BIM",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "política BIM aprobada por la dirección"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "BIM en el contrato y datos compartidos entre las partes"
        }
       ]
      }
     ]
    },
    {
     "codigo": "2.4",
     "nombre_en": "Early goal definition",
     "nombre_es": "Definición temprana de objetivos",
     "descripcion": "grado en que el cliente, el diseñador y el constructor definen de forma conjunta y temprana los objetivos del proyecto. Comprende el momento en que se incorpora el constructor, la cuantificación de los objetivos, su traslado al plan inicial, su vínculo con el contrato y su formalización en información digital.",
     "descriptores": [
      "Cada disciplina define su propia visión y sus propios objetivos del proyecto, y solo con el tiempo los comparte con las demás. El constructor se incorpora recién en la licitación, con un diseño terminado y planos no necesariamente compatibilizados. Los objetivos no se cuantifican ni se formalizan en el contrato ni en la información digital.",
      "Las partes repiten por separado los objetivos de proyectos similares y los trasladan a los hitos del plan. En algunos proyectos, una misma empresa diseña y construye, lo que acerca la definición de objetivos entre ambas funciones. Esa definición no se hace en conjunto con el cliente ni se adapta a las características del proyecto.",
      "La empresa se compromete a definir los objetivos con las demás partes y promueve sesiones conjuntas en las etapas tempranas. Los objetivos de costo, plazo y calidad se adaptan a cada proyecto, se trasladan a los hitos del plan maestro y se formalizan en los requisitos de información y en los usos BIM del plan de ejecución. El constructor se incorpora desde el anteproyecto, aporta constructabilidad antes de congelar el diseño y accede a una plataforma digital compartida. Los contratos incluyen anexos colaborativos y la empresa responde cuando los objetivos cambian.",
      "Los objetivos de costo, plazo y calidad se cuantifican como valores medibles en las etapas más tempranas y se miden desde entonces. Las soluciones a los problemas identificados en su definición se documentan de forma sistemática. La empresa compara los resultados reales con los esperados para hallar brechas, que se atienden en toda la organización.",
      "Cliente, diseñadores, constructor y especialistas definen y acuerdan los objetivos comunes desde la concepción del proyecto en un entorno IPD. Esos objetivos forman una línea base cuantificada que todas las partes aceptan como referencia. El pago a cada parte depende del cumplimiento de los objetivos según métricas desarrolladas en conjunto. Las partes revisan de forma continua las brechas, identifican sus causas raíz y ajustan las soluciones."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Objetivos cuantificados como línea base compartida",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "objetivos de costo, plazo y calidad definidos temprano para cada proyecto"
        },
        {
         "e": "●",
         "t": "cuantificados como valores medibles"
        },
        {
         "e": "●",
         "t": "línea base aceptada por todas las partes"
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Traducción inicial de los objetivos a los hitos del plan maestro",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "hitos tomados de proyectos similares"
        },
        {
         "e": "●",
         "t": "objetivos del proyecto trasladados a los hitos iniciales"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Aporte de constructabilidad antes de congelar el diseño",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "revisión del constructor antes de cerrar el diseño"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Sesiones de definición conjunta de objetivos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "la empresa promueve la definición con las demás partes"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "objetivos comunes acordados en un entorno IPD"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Momento de incorporación del constructor",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "desde el anteproyecto aprobado"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "desde la concepción del proyecto"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Vinculación contractual de las partes con los objetivos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "anexos colaborativos y modalidades de diseño y construcción"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "pago a las partes vinculado al cumplimiento de los objetivos"
        }
       ]
      },
      {
       "codigo": "I4",
       "nombre": "Integración organizacional entre diseño y construcción",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "una misma empresa diseña y construye un proyecto"
        },
        {
         "e": "●",
         "t": "enfoque colaborativo entre cliente y constructor establecido"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Requisitos de información del proyecto que traducen los objetivos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "PIR y EIR formalizados"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Plataforma digital compartida desde las etapas tempranas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "disponible para las partes principales desde el inicio"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Usos BIM acordados en función de los objetivos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "plan de ejecución BIM inicial asociado a los objetivos"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    },
    {
     "codigo": "2.5",
     "nombre_en": "Roles and Responsibilities",
     "nombre_es": "Roles y responsabilidades",
     "descripcion": "capacidad de la organización para asignar los roles y las responsabilidades de producción y de información según la competencia y el conocimiento de cada persona y de cada parte. La asignación se formaliza en una matriz acordada entre las partes y aprovecha el talento disponible en todos los niveles.",
     "descriptores": [
      "La jerarquía de responsabilidades se repite igual en todos los proyectos y el número de personas por rol no cambia con las necesidades de cada obra. Los roles BIM y Lean no están definidos. Las tareas se asignan por costumbre o por cargo, sin considerar la competencia ni el conocimiento de cada persona, por lo que parte del talento disponible queda sin usar.",
      "El plan de ejecución BIM de un proyecto define los roles y las responsabilidades sobre el modelo, y las responsabilidades Lean se expresan en los compromisos semanales del Last Planner System, cada uno con un responsable de frente. Las estrategias de asignación que funcionaron se repiten en proyectos similares, sin un criterio de la empresa.",
      "La empresa define las responsabilidades BIM y Lean y las adapta a cada proyecto, cuyo número de personas varía según sus necesidades. Asigna las tareas y conforma las cuadrillas con base en las competencias acreditadas y evalúa las competencias de todas las categorías, incluido el personal operativo. Su matriz identifica al responsable, el revisor y el aprobador de cada entregable, alcanza a capataces y responsables de frente y se vincula a los usos BIM. Registra los casos en que el conocimiento de un trabajador cambia una asignación.",
      "La empresa define métricas para evaluar las habilidades de su personal frente a las responsabilidades BIM y Lean asignadas, en todas las categorías. Compara cuantitativamente los resultados reales de la evaluación con los esperados para hallar brechas en toda la organización. Los resultados orientan la reasignación de responsabilidades en los proyectos siguientes.",
      "Las partes del proyecto definen en conjunto, desde las etapas más tempranas, los roles BIM, Lean e IPD de cada fase. El liderazgo de cada tarea lo asume la parte más capaz, sin barreras artificiales entre las partes, y la matriz de responsabilidades se acuerda entre todas y se vincula al contrato, a las valorizaciones y al control colaborativo. Técnicas como el pull planning ayudan a asignar el talento adecuado a cada parte y reducen el talento no utilizado. Las partes revisan las brechas por sus causas raíz y ajustan las soluciones."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Compromisos de producción con responsable asignado",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "compromisos semanales del Last Planner System en el proyecto"
        },
        {
         "e": "●",
         "t": "práctica de la empresa en todos sus proyectos"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Competencias acreditadas como insumo para conformar cuadrillas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "cuadrillas conformadas según las competencias acreditadas"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Evaluación de competencias que alcanza al personal operativo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "evaluación en todas las categorías"
        },
        {
         "e": "●",
         "t": "habilidades evaluadas con métricas frente a las responsabilidades asignadas"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Asignación modificada por el conocimiento individual",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "casos registrados en que el conocimiento cambia la asignación"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Liderazgo de cada tarea por la parte más capaz, con roles claramente definidos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "liderazgo asignado entre las partes sin barreras artificiales"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Matriz de responsabilidades acordada entre las partes",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "matriz acordada entre todas las partes"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Matriz de roles productivos vinculada al contrato",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "matriz incorporada al contrato y a sus mecanismos de control"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Roles BIM con responsable, revisor y aprobador por entregable",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "plan de ejecución BIM del proyecto"
        },
        {
         "e": "●",
         "t": "matriz de la empresa por entregable, adaptada a cada proyecto"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Extensión de la matriz BIM a los roles productivos de obra",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "matriz que alcanza a capataces y responsables de frente"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Matriz de responsabilidades enlazada al modelo y a las valorizaciones",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "responsabilidades vinculadas a los usos BIM y entregables"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "vinculadas a las valorizaciones y al control colaborativo entre las partes"
        }
       ]
      }
     ]
    },
    {
     "codigo": "2.6",
     "nombre_en": "Organisational Leadership style",
     "nombre_es": "Estilo de liderazgo organizacional",
     "descripcion": "estilo de liderazgo que la organización ejerce y sostiene en el frente de obra, sea facilitador y no punitivo o de mando y control. Comprende cómo lo percibe el equipo, si la conducción del proyecto se comparte con las demás partes y cómo se ejerce el liderazgo sobre la información digital.",
     "descriptores": [
      "La organización funciona con una estructura de mando y control. Los líderes dan órdenes, revisan informes sin retroalimentar, se centran solo en los resultados y buscan culpables ante las fallas. El éxito del liderazgo depende de cada persona y los líderes reaccionan solo cuando una situación se sale de la meta. Las decisiones se centralizan y el personal no tiene espacio para opinar.",
      "En el proyecto, los líderes apoyan la ejecución de los planes en lugar de dictar las actividades y reconocen el valor de la comunicación, el respeto y la confianza. El residente facilita los compromisos semanales y el levantamiento de restricciones, recorre el frente para observar el trabajo real y exige a los subcontratistas seguir la metodología BIM del proyecto. Ese estilo se repite en obras similares, pero depende de quién dirige.",
      "La empresa ejerce un liderazgo distribuido en el que ninguna voz se impone. Sus líderes ayudan al equipo a resolver problemas y eliminar desperdicios, mantienen los estándares, recorren el frente con regularidad y orientan la respuesta ante las fallas hacia la solución y no hacia la culpa. La empresa capacita y evalúa de forma continua a sus residentes. Un Líder BIM conduce la estrategia digital, el ingreso de cada subcontratista se condiciona a la metodología del proyecto y los líderes revisan el modelo con su equipo. También promueven la colaboración con los contratistas.",
      "La empresa evalúa la competencia de liderazgo de sus residentes y jefes con métricas establecidas y contrasta el estilo que declara con el que percibe su personal mediante mediciones periódicas de clima o satisfacción laboral. Compara los resultados reales con los esperados, identifica brechas y las atiende en toda la organización.",
      "La conducción del proyecto se comparte entre cliente, diseñador, contratista y socios de especialidad, con un equipo de liderazgo constituido formalmente y con funciones y compromisos documentados. El liderazgo se distribuye en grupos interdisciplinarios responsables de un área del proyecto, con responsables de la entrega integrada, de Lean y de BIM. Los líderes actúan como coaches en un entorno de respeto mutuo y responden a las fallas sin buscar culpables. Las partes revisan las brechas por sus causas raíz y ajustan las soluciones."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Responsable de planificación que facilita compromisos y restricciones",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "el residente facilita compromisos en el proyecto"
        },
        {
         "e": "●",
         "t": "función asignada por la empresa en todos sus proyectos"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Observación directa en el frente de obra",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "caminatas de observación en una obra"
        },
        {
         "e": "●",
         "t": "recorridos periódicos como práctica de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Desarrollo profesional sistemático del residente",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "capacitación y evaluación continua del residente"
        },
        {
         "e": "●",
         "t": "competencia de liderazgo evaluada con métricas"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Verificación del estilo mediante la percepción del equipo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "clima o satisfacción medidos periódicamente"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Liderazgo compartido entre las partes del proyecto",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "los líderes promueven la colaboración con los contratistas"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "conducción compartida con cliente, diseñador y socios de especialidad"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Constitución formal del equipo de liderazgo del proyecto",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "funciones y compromisos de los líderes de cada parte documentados"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Respuesta no punitiva del liderazgo ante las fallas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "la empresa orienta la respuesta a la solución y no a la culpa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "respuesta sin culpables entre todas las partes"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Rol de Líder BIM que conduce la estrategia y no solo modela",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "conducción de los procesos y la estrategia BIM"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Control del cumplimiento metodológico antes de ejecutar cada sector",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "exigido a los subcontratistas de un proyecto"
        },
        {
         "e": "●",
         "t": "condición de ingreso en todos los proyectos"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Revisión del modelo por el líder junto con su equipo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "recorrido virtual del trabajo próximo con el equipo"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    },
    {
     "codigo": "2.7",
     "nombre_en": "Open communication",
     "nombre_es": "Comunicación abierta",
     "descripcion": "capacidad de la organización para hacer visibles a todos los niveles el avance y sus causas de incumplimiento, tratar el error como dato del proceso y ofrecer una vía de reporte protegida frente a represalias. Entre las partes, comprende la comunicación directa, la responsabilidad del error asumida sin desplazarla y la información de costos y avance compartida, también en el entorno digital.",
     "descriptores": [
      "La comunicación se hace por correo o de palabra, sin trazabilidad, y los planos 2D dificultan que los participantes se entiendan. El avance y sus causas de incumplimiento no se difunden. El error se trata como falta personal, se sanciona por la misma vía por la que se reportaría y suele desplazarse hacia otra parte o hacia abajo en la cadena.",
      "En el proyecto, el modelo BIM facilita el flujo de información y ayuda a explicar las decisiones técnicas a participantes de distinta especialidad. El porcentaje de plan cumplido y las causas de no cumplimiento se analizan cada semana y se difunden en obra. Las formas de comunicación que funcionaron se repiten en proyectos similares, sin canales establecidos por la empresa.",
      "La empresa establece canales de comunicación vinculados a BIM, Lean y algunos métodos de IPD, y los adapta a cada proyecto. El avance y sus causas de incumplimiento se difunden a todos los niveles, también cuando son malos, y obreros y capataces exponen ellos mismos las causas. El error se analiza como dato del proceso, sin atribución individual, y el trabajador cuenta con un canal de reporte distinto del disciplinario. La empresa asume sus errores, registra digitalmente el avance y las incidencias con su estado y responsable, y define vías de comunicación directa con las demás partes.",
      "La empresa evalúa con métricas los métodos técnicos y culturales con que sostiene la comunicación, la confianza y la transparencia. Mide la frecuencia y el origen de las desviaciones, los reportes recibidos y resueltos por el canal protegido y las incidencias cerradas en el entorno digital. Compara los resultados reales con los esperados para hallar brechas, que se atienden en toda la organización.",
      "Las responsabilidades se definen con precisión desde las etapas tempranas y ninguna parte desplaza su error hacia otra. Las partes comparten riesgos y beneficios, acceden a la información de costos y avance bajo un esquema de libros abiertos y se comunican de forma directa y continua. Sus actividades se vinculan al modelo BIM y al entorno común de datos, donde el avance es visible para todas. Con técnicas como los 5 porqués, las partes identifican las causas raíz de los problemas y mejoran de forma continua la comunicación."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Difusión a todos los niveles de los resultados y las causas de incumplimiento",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "porcentaje de plan cumplido y causas difundidos en el proyecto"
        },
        {
         "e": "●",
         "t": "práctica de la empresa, también con malos resultados"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Obreros y capataces que exponen ellos mismos las causas de incumplimiento",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "exposición directa en las reuniones de planificación"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Tratamiento del error como dato de proceso",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "análisis sin atribución individual"
        },
        {
         "e": "●",
         "t": "frecuencia y origen de las desviaciones medidos"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Canal de reporte distinto del canal disciplinario",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "vía formal de reporte separada de la sanción"
        },
        {
         "e": "●",
         "t": "reportes recibidos y resueltos"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "La responsabilidad del error no se desplaza hacia otra parte",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "la empresa asume sus errores"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "ninguna parte desplaza su error contractualmente"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Información de costos y avance compartida entre las partes",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "libros abiertos entre las partes"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Comunicación directa y abierta entre todos los participantes",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "vías de comunicación directa definidas con las demás partes"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "comunicación directa y continua entre todos los participantes"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Avance del proyecto monitoreado digitalmente y compartido entre las partes",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "registro digital del avance en cada proyecto"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "avance visible para todas las partes"
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Incidencias registradas con estado y responsable visibles",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "incidencias registradas en el entorno digital"
        },
        {
         "e": "●",
         "t": "incidencias cerradas medidas"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Modelo tridimensional como lenguaje común entre especialidades y niveles",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "el modelo explica las decisiones técnicas en el proyecto"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "codigo": "3",
   "nombre_en": "Workplace Standardization",
   "nombre_es": "Estandarización del lugar de trabajo",
   "subatributos": [
    {
     "codigo": "3.1",
     "nombre_en": "Visual Management (VM)",
     "nombre_es": "Gestión visual",
     "descripcion": "capacidad de la empresa para hacer visible, con dispositivos físicos y digitales, el estado del trabajo y de la información del proyecto en el lugar de trabajo y para todos los niveles, incluido el personal operativo. Comprende la señalización de las anomalías donde ocurren y el alcance de lo expuesto a todas las partes y empresas del frente.",
     "descriptores": [
      "No existe un método para hacer visible el avance, las especificaciones, la geometría, la red de compromisos o las interferencias. Algunas personas comunican esa información por iniciativa propia, con medios improvisados que no se actualizan. Lo que se exhibe, cuando existe, se dirige al personal profesional y no al operativo, y las anomalías se conocen por reportes.",
      "En el proyecto se instalan tableros con datos de avance real, como el porcentaje de plan cumplido, planes semanales visuales o tableros Kanban que incluyen a los subcontratistas, y se actualizan con una cadencia semanal. El modelo BIM se usa en las reuniones de obra para mostrar el estado de cada sector. Los métodos que funcionaron se trasladan a proyectos similares, sin un estándar de la empresa.",
      "La empresa estandariza y documenta sus métodos de gestión visual, los vincula a BIM y Lean y los adapta a cada proyecto. Sus tableros usan pictogramas o una codificación simplificada que cualquier operario puede leer, se actualizan con una cadencia declarada y muestran el último periodo cerrado. Las anomalías se señalan en el punto donde ocurren. Los entregables tienen un estado explícito en el entorno común de datos y el modelo muestra con colores qué está ejecutado, liberado o pendiente.",
      "La empresa mide la calidad de sus métodos de gestión visual con métricas definidas: el cumplimiento de la cadencia de actualización, la comprensión del tablero por el personal operativo y las anomalías señalizadas y atendidas. Las soluciones a los problemas identificados se documentan de forma sistemática. Los resultados reales se comparan con los esperados para hallar brechas en toda la organización.",
      "Las partes del proyecto acuerdan qué indicadores exhibir en el espacio compartido y los hacen accesibles a todas, incluidos los subcontratistas, de modo que cada empresa vea cómo su trabajo condiciona al de las demás. Lo expuesto son indicadores del desempeño conjunto del equipo integrado y no de cada empresa. Las partes revisan de forma continua sus técnicas visuales, identifican las causas raíz de los problemas y ajustan las soluciones."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Tableros de control de producción con indicadores verificables",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "tableros con datos de avance real en el proyecto"
        },
        {
         "e": "●",
         "t": "métodos estandarizados y documentados por la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Diseño accesible del tablero",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "pictogramas o codificación simplificada"
        },
        {
         "e": "●",
         "t": "comprensión por el personal operativo verificada"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Señalización de la anomalía en el punto de trabajo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "señal visual donde ocurre la desviación"
        },
        {
         "e": "●",
         "t": "anomalías señalizadas y atendidas medidas"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Vigencia del dato expuesto",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "cadencia semanal en el proyecto"
        },
        {
         "e": "●",
         "t": "cadencia declarada por la empresa, con el último periodo cerrado"
        },
        {
         "e": "●",
         "t": "cumplimiento de la cadencia medido"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Exposición acordada de indicadores en el espacio compartido",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "indicadores acordados y accesibles a todas las partes"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Alcance de lo expuesto sobre todas las empresas del frente",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "tablero que incluye a los subcontratistas de un proyecto"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "cada empresa ve cómo su trabajo condiciona al de las demás"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Indicadores del desempeño conjunto, no de cada empresa",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "indicadores del equipo integrado"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Estados codificados de la información en el entorno común de datos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "estado explícito de cada entregable"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Estado del trabajo codificado en el modelo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "elementos codificados como ejecutados, liberados o pendientes"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Modelo disponible en el frente para comunicar el estado del trabajo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "modelo por sector en la planificación semanal del proyecto"
        },
        {
         "e": "●",
         "t": "práctica de la empresa en las reuniones de obra"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    },
    {
     "codigo": "3.2",
     "nombre_en": "5S Implementation",
     "nombre_es": "Implementación de las 5S",
     "descripcion": "aplicación verificable de las tres primeras S (clasificar, ordenar y limpiar) en el lugar de trabajo físico y digital, y existencia de un mecanismo institucionalizado para sostener las dos últimas (comité, estándares documentados y auditorías periódicas). Incluye la extensión de esa responsabilidad a las zonas compartidas entre empresas y a la organización de la información del proyecto.",
     "descriptores": [
      "Las 5S no están establecidas y no hay un orden definido en la obra, en la oficina ni en los archivos del proyecto. El jefe de obra o de oficina ordena y limpia según las circunstancias, y los problemas se resuelven a medida que surgen. Los materiales no tienen un lugar asignado y los archivos se nombran y guardan según el criterio de cada persona.",
      "Un proyecto establece estándares básicos de 5S para la obra o para la información: integra el orden al layout, delimita las zonas de acopio, capacita a sus trabajadores y fija en el plan de ejecución BIM una convención de nombres para los archivos. Las soluciones que funcionaron se repiten en proyectos similares, pero el orden decae cuando termina la implementación inicial.",
      "La empresa define estándares de 5S para toda la organización, con metas, y los adapta a cada proyecto. Clasificar, ordenar y limpiar se aplican en la obra, en la oficina técnica y en el entorno digital, con zonas de acopio delimitadas, una convención de nombres para los archivos, el retiro de las versiones superadas y la depuración periódica del modelo. Un comité o responsable con respaldo de la dirección sostiene Estandarizar y Disciplina mediante un calendario de auditorías, y los subcontratos incluyen el estándar de orden.",
      "La empresa mide la calidad de la implementación de las 5S mediante auditorías con puntaje por fase, línea base y remediciones periódicas. Las soluciones a los problemas identificados se documentan de forma sistemática. Los resultados de las auditorías se comparan con las metas para hallar brechas, que se atienden en toda la organización.",
      "El orden y la limpieza de las zonas que todos usan, como accesos, patios de acopio y vías internas, son responsabilidad conjunta de todas las empresas del frente, sostenida por un incentivo compartido. Las empresas trabajan con un estándar común y verifican juntas el estado del sitio. En oficinas, obras y archivos, la información, los materiales y las herramientas se clasifican por tipo y lugar de uso. Las partes identifican las causas raíz de los problemas y revisan las soluciones de forma continua."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Implementación verificable de Clasificar, Ordenar y Limpiar",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "orden integrado al layout de un proyecto"
        },
        {
         "e": "●",
         "t": "estándar de la empresa con metas"
        },
        {
         "e": "●",
         "t": "puntaje por fase con línea base y remedición"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Delimitación y señalización de las zonas de acopio",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "zonas delimitadas en el layout del proyecto"
        },
        {
         "e": "●",
         "t": "criterio de la empresa para todos sus proyectos"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Extensión del estándar de orden a los archivos de la oficina técnica",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "misma lógica de orden en los documentos de gestión"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Comité o responsable nominado para Estandarizar y Disciplina",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "instancia formal con respaldo de la dirección"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L5",
       "nombre": "Auditorías periódicas documentadas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "calendario de auditorías"
        },
        {
         "e": "●",
         "t": "resultados comparados con las metas"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Responsabilidad compartida sobre las zonas comunes de obra",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "zonas comunes a cargo de todas las empresas, con incentivo compartido"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Participación de las empresas del frente en la verificación del sitio",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "verificación con representantes de cada empresa"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Estándar de orden común a todas las empresas, incorporado a sus subcontratos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "estándar de orden en los subcontratos de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "estándar común acordado por todas las empresas"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Convención de nombres y clasificadores de los archivos del modelo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "convención del plan de ejecución BIM de un proyecto"
        },
        {
         "e": "●",
         "t": "convención de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Retiro de las versiones superadas del espacio de trabajo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "contenedores superados pasan a archivo"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Clasificar, ordenar y limpiar el contenido del modelo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "depuración periódica del modelo"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    },
    {
     "codigo": "3.3",
     "nombre_en": "BIM information sharing management",
     "nombre_es": "Gestión del intercambio de información BIM",
     "descripcion": "capacidad de la organización para gestionar el intercambio de la información BIM: con qué ritmo y responsables se actualiza el modelo, mediante qué entorno común de datos se comparte y si la información vigente llega a todas las partes y al personal de campo que la usa, con trazabilidad de versión y de recepción.",
     "descriptores": [
      "No existe un modelo BIM establecido ni un método para compartir su información con otras disciplinas. El proceso de intercambio no está definido y cambia a medida que avanza el trabajo, según las estrategias de cada persona. La información llega a obra en planos de versión incierta y nadie verifica si el frente trabaja con la vigente.",
      "En un proyecto se definen tiempos de respuesta y metas de entrega para actualizar los planos y el modelo, se usa un entorno común de datos y el modelo se comparte con los subcontratistas en las sesiones de planificación. La información llega al campo mediante dispositivos o planos derivados. Los métodos que funcionaron se trasladan a proyectos similares y ayudan a mantener las prácticas en momentos de presión.",
      "La empresa estandariza y documenta sus métodos de intercambio de información BIM y los adapta a cada proyecto. El plan de ejecución BIM fija un protocolo de sincronización del modelo federado, y el entorno común de datos cumple requisitos técnicos definidos. La actualización se rige por la planificación de producción y entra en el Last Planner System. Antes de ejecutar, el frente verifica que usa la versión vigente, que recibe en documentos derivados con registro de recepción. Las empresas sin capacidad BIM reciben medios para usar la información.",
      "La empresa mide los requisitos, la eficacia y la calidad del intercambio de información BIM: el cumplimiento de la meta de entrega de las actualizaciones, el de los plazos comprometidos por cada especialidad y las confirmaciones de recepción en campo. Las soluciones a los problemas identificados se documentan de forma sistemática. Los resultados reales se comparan con los esperados para hallar brechas en toda la organización.",
      "Cada especialidad y cada parte se compromete a entregar su información en plazos acordados, y cada subcontratista trabaja con la parte vigente del modelo que le corresponde. Las partes discuten y revisan de forma continua la propiedad del modelo, la interoperabilidad, el IFC, el entorno común de datos y el modelo federado, con un responsable BIM que facilita la comunicación sobre el modelo. Las partes identifican las causas raíz de los problemas y revisan las soluciones de forma continua."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Actualización sincronizada con la planificación de producción",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "meta de entrega en un proyecto"
        },
        {
         "e": "●",
         "t": "calendario de la empresa vinculado a la planificación intermedia"
        },
        {
         "e": "●",
         "t": "cumplimiento de la meta de entrega medido"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Verificación de la vigencia de la versión antes de ejecutar",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "comprobación en el frente antes de iniciar"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Integración del flujo de información BIM con el Last Planner System",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "la información del modelo entra en la planificación semanal"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Plazos de entrega de la información comprometidos por especialidad",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "tiempos de respuesta definidos en el plan BIM de un proyecto"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "cumplimiento de los plazos registrado"
        },
        {
         "e": "●",
         "t": "cada parte se compromete a plazos acordados"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Modelo compartido con los subcontratistas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "modelo por nivel en las sesiones de planificación de un proyecto"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "cada subcontratista trabaja con su parte vigente del modelo"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Inclusión de las empresas de baja adopción BIM en el intercambio",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "visores y documentos simplificados para la cadena"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Protocolo de sincronización del modelo federado en el plan de ejecución BIM",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "protocolo de la empresa en el plan de ejecución BIM"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "propiedad, interoperabilidad y modelo federado revisados entre las partes"
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Entorno común de datos operativo según requisitos técnicos definidos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "entorno común de datos en la fase de diseño de un proyecto"
        },
        {
         "e": "●",
         "t": "entorno con requisitos técnicos definidos en todos los proyectos"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Documentos derivados para el campo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "dispositivos y planos de campo en un proyecto"
        },
        {
         "e": "●",
         "t": "práctica de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B4",
       "nombre": "Trazabilidad de última milla hacia el personal de campo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "registro de versión, receptor y confirmación"
        },
        {
         "e": "●",
         "t": "confirmaciones de recepción medidas"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "codigo": "4",
   "nombre_en": "Waste Minimization",
   "nombre_es": "Minimización del desperdicio",
   "subatributos": [
    {
     "codigo": "4.1",
     "nombre_en": "Construction Defects Identification and minimisation",
     "nombre_es": "Identificación y minimización de defectos de construcción",
     "descripcion": "capacidad de la empresa para prevenir los defectos en su origen y registrar el retrabajo que provocan. En diseño, detecta y resuelve las interferencias antes de construir; en ejecución, verifica cada partida contra criterios de aceptación acordados antes de darla por conforme. Los defectos y el retrabajo se registran y cuantifican por causa y costo.",
     "descriptores": [
      "Los defectos se detectan de forma manual, en obra y según la experiencia de cada participante, por lo que buena parte de la información se pierde. La obra trabaja con planos no necesariamente compatibilizados y las interferencias aparecen al construir. Cada partida se acepta con el criterio del inspector de turno, y los defectos y el retrabajo no se registran ni se usan para prevenirlos.",
      "En el proyecto, las interferencias se detectan sobre el modelo BIM antes de construir, se definen protocolos de calidad con criterios de aceptación y liberación de partidas, y el primer ciclo de las actividades repetitivas se observa para ajustar el procedimiento. Las no conformidades se registran y sus datos se reutilizan en proyectos similares, sin un estándar de la empresa.",
      "La empresa define protocolos de aseguramiento de la calidad y los adapta a cada proyecto. Cada partida crítica tiene criterios de aceptación y una liberación formal antes de continuar, y el plan de calidad adopta un estándar de tolerancias. En diseño, las interferencias se detectan con aplicaciones BIM y se resuelven según una matriz de tolerancia con responsable asignado. Cada defecto y el retrabajo que provoca se registran por causa, frecuencia y costo, y el primer ciclo de las actividades repetitivas ajusta el procedimiento.",
      "La empresa mide con métricas establecidas sus métodos de análisis de constructabilidad e identificación de defectos. Cuantifica el retrabajo por causa y costo, y compara el costo de adicionales y penalidades como porcentaje del presupuesto entre proyectos con y sin coordinación digital previa. Los resultados reales se comparan con los esperados para hallar brechas, que se atienden en toda la organización.",
      "Las partes usan el modelo BIM para detectar los defectos de forma virtual y temprana, y acuerdan desde el inicio los protocolos de calidad y los métodos de prevención. El contrato incorpora un estándar de tolerancias, exige el diseño compatibilizado antes de ejecutar, fija una ruta común para notificar y resolver los defectos y define por anticipado cómo se asume el costo del retrabajo. Las partes revisan de forma continua sus métodos, identifican las causas raíz y ajustan las soluciones."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Criterios de aceptación definidos por partida antes de ejecutar",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "procedimientos de aceptación en un proyecto"
        },
        {
         "e": "●",
         "t": "criterios de la empresa para cada partida crítica"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Liberación de la partida antes de continuar con la siguiente",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "protocolo de liberación en un proyecto"
        },
        {
         "e": "●",
         "t": "liberación formal como práctica de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Registro del defecto y del retrabajo por causa, frecuencia y costo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "no conformidades registradas y reutilizadas en proyectos similares"
        },
        {
         "e": "●",
         "t": "registro por causa, frecuencia y costo documentado en la organización"
        },
        {
         "e": "●",
         "t": "retrabajo cuantificado por causa y costo"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Ajuste del procedimiento a partir del primer ciclo constructivo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "primer ciclo observado en un proyecto"
        },
        {
         "e": "●",
         "t": "práctica de la empresa en actividades repetitivas"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Estándar de tolerancias incorporado al contrato o al plan de calidad",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "estándar adoptado en el plan de calidad de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "estándar incorporado al contrato entre las partes"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Procedimiento acordado de notificación y resolución de defectos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "ruta común de notificación y resolución entre las partes"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Entrega del diseño compatibilizado como condición acordada",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "compatibilización exigida antes de ejecutar"
        }
       ]
      },
      {
       "codigo": "I4",
       "nombre": "Tratamiento acordado del costo del retrabajo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "costo del retrabajo acordado por anticipado"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Detección y resolución de interferencias sobre el modelo federado antes de construir",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "interferencias detectadas sobre el modelo en un proyecto"
        },
        {
         "e": "●",
         "t": "detección con aplicaciones BIM como práctica de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "detección virtual y temprana por todas las partes"
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Matriz de tolerancia de interferencias y responsable en el plan de ejecución BIM",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "regla de relevancia y responsable de resolución"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Efecto económico del retrabajo evitado en diseño",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "adicionales y penalidades comparados entre proyectos"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    },
    {
     "codigo": "4.2",
     "nombre_en": "Waiting time minimisation",
     "nombre_es": "Minimización del tiempo de espera",
     "descripcion": "capacidad de la empresa para impedir que las cuadrillas queden inactivas: libera las restricciones antes de asignar la tarea, secuencia el trabajo para que siempre haya un frente disponible y mide la espera por causa y el tiempo de levantamiento de cada restricción. Comprende los plazos de respuesta y de entrega de frentes comprometidos entre las partes y la programación vinculada al modelo para anticipar los cuellos de botella.",
     "descriptores": [
      "La planificación y la coordinación son ineficaces y generan colas por información, materiales y equipos. Las cuadrillas se lanzan a campo sin verificar si tienen insumos, información y frente disponibles, y los problemas de espera se resuelven sobre la marcha por esfuerzo de cada persona. La espera no se mide y las consultas técnicas se responden sin plazo.",
      "En el proyecto, la planificación intermedia (lookahead) identifica y levanta las restricciones antes de programar la semana, el trabajo se secuencia por ubicación y la inactividad de las cuadrillas se mide por muestreo. Las causas de incumplimiento se clasifican, y en algunos proyectos las restricciones se ubican sobre el modelo. Las estrategias que funcionaron se repiten en proyectos similares.",
      "La empresa establece el Last Planner System con liberación de restricciones como práctica de todos sus proyectos y lo adapta a cada uno. Secuencia el trabajo por ubicación para que cada cuadrilla tenga siempre un frente liberado. Gestiona las restricciones en un registro digital con estados y fechas, vinculado a los sectores del modelo, y la restricción vencida conserva su fecha original. Simula la secuencia en 4D para anticipar cuellos de botella y usa el entorno común de datos para reducir las consultas.",
      "La empresa define métricas para el tiempo de espera y las revisa de forma continua. Mide cuánto esperan las cuadrillas por cada causa, cuánto tarda cada restricción en levantarse y qué proporción del tiempo es trabajo no contributorio, con datos del registro digital de restricciones. Compara los tiempos reales con los esperados para hallar brechas, que se atienden en toda la organización.",
      "Las partes planifican de forma intensiva y deciden juntas para minimizar la espera. La empresa que termina un frente se compromete con fecha a entregarlo a la siguiente, las consultas técnicas se responden en plazos acordados según su criticidad y las restricciones vencidas escalan a un nivel de decisión definido entre las partes. La red de compromisos se vincula al modelo BIM, y el reparto de riesgos y beneficios refuerza el cumplimiento. Las partes identifican las causas raíz y revisan las soluciones de forma continua."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Liberación de restricciones antes de asignar la tarea",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "planificación intermedia en un proyecto"
        },
        {
         "e": "●",
         "t": "práctica de la empresa dentro del Last Planner System"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Medición de la inactividad real en campo por muestreo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "muestreo de trabajo en un proyecto"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "trabajo no contributorio medido en la organización"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Secuenciación por ubicación para garantizar un frente continuo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "planificación por ubicación en un proyecto"
        },
        {
         "e": "●",
         "t": "práctica de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Tiempo de espera por causa y tiempo de levantamiento de cada restricción",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "causas de incumplimiento clasificadas en el proyecto"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "espera por causa y tiempo de levantamiento medidos"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Compromisos de entrega de frente entre empresas sucesivas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "entrega de frente con fecha entre empresas"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Plazo de respuesta a las consultas técnicas según su criticidad",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "plazo acordado entre las partes"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Escalamiento acordado de las restricciones vencidas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "la restricción vencida conserva su fecha original"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "escala a un nivel de decisión definido entre las partes"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Registro digital de restricciones con trazabilidad de estados",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "plataforma con estados y fechas"
        },
        {
         "e": "●",
         "t": "fuente del tiempo de levantamiento"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Restricciones identificadas sobre el modelo por ubicación",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "restricciones ubicadas sobre el modelo en un proyecto"
        },
        {
         "e": "●",
         "t": "práctica de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "red de compromisos vinculada al modelo"
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Simulación 4D para anticipar cuellos de botella de secuencia",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "secuencia simulada antes de ejecutar"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    },
    {
     "codigo": "4.3",
     "nombre_en": "Transportation & Motion management",
     "nombre_es": "Gestión del transporte y el movimiento",
     "descripcion": "capacidad de la empresa para diseñar la logística de la obra de modo que se acorten los recorridos de materiales y personas, y para medirlos. Comprende el suministro jalado desde la programación semanal, el control del stock por rotación con trazabilidad desde el pedido hasta el uso, la coordinación con las demás partes y los proveedores sobre accesos, acopios y despachos, y el uso del modelo para simular la logística y derivar los pedidos.",
     "descriptores": [
      "El layout de la obra no se incorpora a la planificación y cambia a medida que avanza el trabajo. Los materiales se compran por estimación del residente, se acopian donde hay espacio y llegan con tiempos de tránsito fijos, sin considerar la congestión. El stock y los recorridos no se controlan, y los métodos que funcionan dependen de cada persona.",
      "En el proyecto, el layout ubica almacenes y acopios cerca del frente y se elige entre alternativas de distribución. Los materiales se distribuyen según los ciclos de producción, se reciben con fichas de control y su entrega se apoya en un modelo 4D vinculado a la planificación. Se asume que proyectos similares tendrán la misma logística, sin un estándar de la empresa.",
      "La empresa establece un estándar logístico que adapta a cada proyecto. Define la distribución con un método formal y diagramas de recorrido, y modela en 4D los acopios, el radio de las grúas y las rutas según las reglas del plan de ejecución BIM. Los pedidos se generan desde la liberación de restricciones y los metrados del modelo, con ventanas de entrega que absorben la congestión vial. El stock se controla por clase con puntos de reposición, cada movimiento de almacén se registra, los proveedores se evalúan y el excedente se liquida al cierre.",
      "La empresa mide el tiempo improductivo de transporte y movimiento con métricas establecidas: distancia recorrida, número de viajes y tiempo de ciclo antes y después de intervenir la distribución. Mide además las entregas tardías, el cumplimiento de los proveedores y la rotación, inactividad y exactitud del inventario. Revisa las métricas de forma continua y compara los resultados reales con los esperados para hallar brechas en toda la organización.",
      "Las partes planifican juntas la logística de la obra: programan de forma compartida las llegadas y el uso de los equipos de izaje, y acuerdan el reparto de las áreas de acopio y de los accesos. Los proveedores clave alinean sus programas de fabricación y despacho con el cronograma, y el estado de cada material se lee sobre el modelo desde el pedido hasta el montaje. Con pull planning, Just in Time y Kanban, las partes identifican las causas raíz y mejoran la logística de forma continua."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Zonificación de acopios y almacenes próximos al frente",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "layout de un proyecto"
        },
        {
         "e": "●",
         "t": "criterio de la empresa, con almacenes descentralizados"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Método formal de distribución con alternativas evaluadas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "alternativas evaluadas en un proyecto"
        },
        {
         "e": "●",
         "t": "procedimiento de la empresa con diagramas de recorrido"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Medición cuantificada del recorrido",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "distancia, viajes o tiempo de ciclo antes y después"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Suministro jalado desde el plan semanal",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "distribución por ciclos de producción en un proyecto"
        },
        {
         "e": "●",
         "t": "pedidos generados desde la liberación de restricciones"
        },
        {
         "e": "●",
         "t": "entregas tardías medidas"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L5",
       "nombre": "Control del stock por clase de material con niveles de reposición",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "clasificación por clase con punto de reposición"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L6",
       "nombre": "Trazabilidad de la recepción y del movimiento de almacén",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "fichas de recepción en un proyecto"
        },
        {
         "e": "●",
         "t": "movimientos registrados sin desfase"
        },
        {
         "e": "●",
         "t": "rotación, inactividad y exactitud del inventario"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L7",
       "nombre": "Gestión del excedente al cierre de obra",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "procedimiento de liquidación o redistribución"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L8",
       "nombre": "Absorción de la variabilidad vial en la programación logística",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "ventanas de entrega según congestión y horarios de carga"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Programación compartida de llegadas y de equipos de izaje",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "secuencia de despachos e izaje planificada entre las partes"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Asignación acordada de áreas de acopio y accesos compartidos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "reparto acordado del espacio común"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Evaluación y fidelización de proveedores como factor de riesgo de abastecimiento",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "criterio técnico de la empresa para sus proveedores"
        },
        {
         "e": "●",
         "t": "cumplimiento de los proveedores medido"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I4",
       "nombre": "Programas de fabricación y despacho de los proveedores alineados al cronograma",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "programas compartidos y alineados con el montaje"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Modelo 4D de la logística del sitio, con acopios y su capacidad",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "acopios, radio de grúa y rutas modelados"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Protocolo de espacios temporales en el plan de ejecución BIM",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "reglas de modelado de espacios temporales"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Modelo vinculado al cronograma de entregas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "modelo 4D vinculado a la planificación de un proyecto"
        },
        {
         "e": "●",
         "t": "práctica de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B4",
       "nombre": "Metrados del modelo para generar los pedidos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "órdenes de compra desde el modelo"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B5",
       "nombre": "Trazabilidad del suministro por elemento del modelo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "estado de cada material leído sobre el modelo"
        }
       ]
      }
     ]
    },
    {
     "codigo": "4.4",
     "nombre_en": "Over processing minimisation",
     "nombre_es": "Minimización del sobreprocesamiento",
     "descripcion": "capacidad de la empresa para producir al ritmo que el proceso siguiente puede absorber, sin adelantar partidas, y para ejecutar y documentar solo lo que la especificación y los entregables acordados exigen. Comprende un esquema de pago que no premia el adelanto ni el exceso y una información que se genera una sola vez, en la cantidad necesaria y cuando el campo la necesita.",
     "descriptores": [
      "Los requisitos de las partes, los entregables y los alcances no se captan con claridad. Cada cuadrilla avanza a la velocidad que puede, por delante del sector siguiente, y la planificación y la coordinación ineficaces generan sobreprocesamiento. Se ejecuta y se documenta más de lo que exige la especificación, y los planos y datos se redibujan o transcriben entre formatos.",
      "En el proyecto se captan los entregables y el alcance, y la obra se divide en sectores de metrado equilibrado encadenados en trenes de trabajo. Las unidades repetitivas avanzan con un ritmo definido, acordado con los subcontratistas, y las cuadrillas se dimensionan para avanzar a velocidad equivalente. Sin embargo, se asume que los entregables son los mismos en proyectos similares, lo que genera sobreprocesamiento.",
      "Toda la organización se ciñe al alcance y a los entregables acordados. La empresa sectoriza la obra, fija un ritmo de producción y balancea las cuadrillas, y la cuadrilla que termina antes recurre a tareas de reserva sin entrar al sector siguiente. Cada actividad crítica se ejecuta con el acabado que exige la especificación. El modelo contrasta el avance real con el programado y concilia los metrados valorizados; la información se emite según el ritmo de campo, se genera una sola vez y con el nivel de información necesaria pactado.",
      "La empresa compara y mide cuantitativamente los entregables reales frente a los esperados y acordados. Contrasta en el modelo el avance real con el programado por sector y concilia los metrados valorizados con la producción acumulada, para detectar adelantos y sobrevalorizaciones. Las brechas se identifican y se atienden en toda la organización.",
      "Las partes colaboran de forma estrecha y continua con BIM abierto y técnicas Lean para ceñirse a los entregables acordados. El esquema de pago no premia el adelanto de partidas y condiciona el cobro a entregables verificados, y el ritmo de liberación de la producción se acuerda con todos los subcontratistas en un espacio común. Los datos se registran una sola vez y se comparten entre las partes. Las partes identifican las causas raíz del sobreprocesamiento y revisan las soluciones de forma continua."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Sectorización de la obra en lotes de producción equivalentes",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "sectores y trenes de trabajo en un proyecto"
        },
        {
         "e": "●",
         "t": "práctica de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Ritmo de producción definido entre unidades repetitivas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "ritmo definido en un proyecto repetitivo"
        },
        {
         "e": "●",
         "t": "ritmo definido como práctica de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Balance de capacidad entre partidas sucesivas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "dimensionamiento de cuadrillas en un proyecto"
        },
        {
         "e": "●",
         "t": "práctica de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Disciplina de entrada al sector siguiente y reserva de trabajo preparado",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "tareas de reserva sin adelantar el lote siguiente"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L5",
       "nombre": "Ejecución ajustada a la especificación, sin pasos ni calidad por encima de lo requerido",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "acabado definido antes de comprometer a la cuadrilla"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Criterio de valorización que no premia el adelanto de partidas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "esquema de pago acordado entre las partes"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Pago condicionado a entregables acordados y verificados",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "cobro sujeto a la verificación de los entregables"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Ritmo de liberación de la producción acordado con los subcontratistas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "ritmo acordado con un subcontratista en un proyecto"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "ritmo común acordado con todos los subcontratistas"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Comparación 4D entre avance real y programado por sector",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "contraste en el modelo"
        },
        {
         "e": "●",
         "t": "avance real frente al programado medido"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Emisión de información condicionada al ritmo de campo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "publicación programada según el ritmo de obra"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Conciliación de metrados ejecutados contra el modelo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "lo valorizado cruzado con lo acumulado en el modelo"
        },
        {
         "e": "●",
         "t": "sobrevalorizaciones detectadas y medidas"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B4",
       "nombre": "Información generada una sola vez desde el modelo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "planos derivados y datos registrados una sola vez"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "datos compartidos entre las partes con BIM abierto"
        }
       ]
      },
      {
       "codigo": "B5",
       "nombre": "Nivel de información necesaria pactado",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "nivel de información necesaria en el plan de ejecución BIM"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "codigo": "5",
   "nombre_en": "Continuous Improvement",
   "nombre_es": "Mejora continua",
   "subatributos": [
    {
     "codigo": "5.1",
     "nombre_en": "Metric establishment",
     "nombre_es": "Establecimiento de métricas",
     "descripcion": "capacidad de la empresa para establecer un sistema de indicadores de producción con causas clasificadas de forma estable, usarlo para decidir y no solo para reportar, y agregarlo hacia un nivel estratégico con metas y responsables. Comprende la definición conjunta de las métricas entre las partes, la revisión del desempeño frente a los objetivos definidos al inicio y la captura de los datos en la fuente, incluida la información del modelo.",
     "descriptores": [
      "Las métricas son una iniciativa individual dentro de un proyecto y se limitan a una propuesta básica para medir algunas estrategias. No se calculan de forma periódica, las causas de incumplimiento no se clasifican y los datos se consolidan a mano, cuando se consolidan. Los indicadores, si existen, sirven para reportar y no para decidir.",
      "En el proyecto se calculan cada semana el porcentaje de plan cumplido y los rendimientos reales frente a la meta presupuestada, y las causas de no cumplimiento se clasifican en categorías. Las métricas que funcionaron en proyectos anteriores se repiten en proyectos similares, sin un estándar de la empresa.",
      "La empresa define y estandariza sus métricas y las adapta a cada proyecto. Clasifica las causas de incumplimiento con las mismas categorías en el tiempo, asigna a cada desviación una acción con responsable y plazo, y agrega los indicadores de producción a un tablero de gestión con metas y umbrales. Los objetivos definidos al inicio se siguen con indicadores por hito, el plan de ejecución BIM declara sus indicadores con fórmula y meta, y los datos de producción se capturan a diario desde aplicaciones.",
      "La empresa evalúa en el tiempo la eficacia de sus métricas y mide la calidad del desempeño frente a ellas. Verifica con la medición posterior el efecto de cada acción correctiva, mide las desviaciones frente a los objetivos iniciales y obtiene del modelo el avance físico para atribuir las desviaciones a elementos identificables. Compara los resultados reales con los esperados y atiende las brechas en toda la organización.",
      "Las partes, incluido el propietario, discuten desde el inicio y acuerdan las métricas del proyecto: desempeño general, sostenibilidad, costo, plazo y alcance. Revisan juntas y de forma periódica el desempeño en una instancia de decisión conjunta, y el costo, el plazo y la calidad son trazables porque están vinculados al modelo BIM compartido. Las partes identifican las causas raíz de las desviaciones y revisan las soluciones de forma continua."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Indicadores de confiabilidad de la planificación con seguimiento semanal",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "porcentaje de plan cumplido y rendimientos en un proyecto"
        },
        {
         "e": "●",
         "t": "indicadores estandarizados en la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Clasificación estable de las causas de no cumplimiento",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "causas clasificadas en un proyecto"
        },
        {
         "e": "●",
         "t": "mismas categorías en toda la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Uso del indicador para decidir, no solo para reportar",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "cada desviación con acción, responsable y plazo"
        },
        {
         "e": "●",
         "t": "efecto de la acción verificado con la medición posterior"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Agregación de los indicadores operativos hacia un marco estratégico",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "tablero de gestión con metas y umbrales"
        },
        {
         "e": "●",
         "t": "eficacia de las métricas evaluada en el tiempo"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Definición conjunta de las metas y métricas del proyecto",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "métricas acordadas por todas las partes, incluido el propietario"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Revisión conjunta y periódica del desempeño",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "instancia de decisión conjunta"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Seguimiento de los objetivos definidos al inicio con indicadores por hito",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "indicadores por hito"
        },
        {
         "e": "●",
         "t": "desviaciones frente a los objetivos iniciales medidas"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Avance físico del modelo frente al avance económico",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "desviación atribuida a elementos del modelo"
        },
        {
         "e": "●",
         "t": "costo, plazo y calidad trazables en el modelo compartido"
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Indicadores de desempeño declarados en el plan de ejecución BIM",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "indicadores con fórmula, meta, frecuencia y responsable"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Captura digital diaria de los datos de producción en la fuente",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "registro diario desde aplicaciones"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    },
    {
     "codigo": "5.2",
     "nombre_en": "Responses to defects",
     "nombre_es": "Respuestas a los defectos",
     "descripcion": "capacidad de la empresa para responder a los defectos con un análisis de causa raíz que actualiza sus estándares y verifica su eficacia por la no recurrencia. Comprende el paso de medidas reactivas a preventivas, con dispositivos a prueba de errores (Poka-Yoke) que tienen criterio de bloqueo y efecto medido, y el acuerdo de esas medidas entre las partes, apoyado en la validación del modelo.",
     "descriptores": [
      "La empresa responde a los defectos después de que ocurren, con correcciones puntuales de naturaleza reactiva. No analiza sus causas ni verifica si reaparecen, y las precauciones dependen de la atención de cada supervisor. El personal de campo no puede detener una actividad por una anomalía de calidad y la conformidad depende del juicio visual.",
      "El proyecto establece estándares básicos de prevención y analiza la causa de los defectos en el frente donde ocurren, sin modificar los procedimientos de la empresa. Aplica algunos dispositivos a prueba de errores (Poka-Yoke) en puntos críticos. Las medidas que funcionaron se repiten en proyectos similares.",
      "La empresa reconoce las medidas preventivas, les fija metas y las adapta a cada proyecto. Cada no conformidad deriva en un análisis de causa raíz que modifica un estándar de la empresa y se cierra solo tras verificar que no reaparece. Los dispositivos a prueba de errores tienen tipo, punto de instalación y criterio de bloqueo, y el personal puede detener la actividad ante una anomalía de calidad. El modelo se valida contra reglas antes de publicarse, el montaje se verifica en campo contra el modelo y un responsable BIM sostiene la prevención.",
      "La empresa mide la eficacia de sus medidas preventivas con métricas establecidas. Registra el indicador de defectos antes y después de cada dispositivo y distingue su aporte del de otras herramientas aplicadas en paralelo. Las soluciones a los problemas identificados se documentan de forma sistemática, y los resultados reales se comparan con los esperados para hallar brechas en toda la organización.",
      "Las partes establecen juntas medidas preventivas para identificar los defectos que cruzan organizaciones y minimizar su ocurrencia. Cada salvaguarda se diseña con quienes proyectan y ejecutan, los defectos que nacen en la interfaz entre dos empresas se controlan en común y un responsable BIM sostiene la prevención entre todas. El esquema contractual hace que el costo de un error afecte al conjunto, de modo que todas invierten en prevención. Las partes identifican las fortalezas y debilidades y revisan las soluciones de forma continua."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Análisis de causa raíz que actualiza un estándar organizacional",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "análisis en el frente, sin actualizar el estándar de la empresa"
        },
        {
         "e": "●",
         "t": "análisis que modifica un procedimiento de la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Verificación de eficacia por no recurrencia en un plazo definido",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "cierre solo tras verificar la no recurrencia"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Dispositivo a prueba de errores con tipo, punto de instalación y criterio de bloqueo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "dispositivos aplicados en puntos críticos de un proyecto"
        },
        {
         "e": "●",
         "t": "tipo, punto de instalación y criterio de bloqueo definidos"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Facultad de detener el proceso ante una anomalía de calidad",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "personal autorizado a detener la actividad"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L5",
       "nombre": "Medición del efecto atribuible al dispositivo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "indicador antes y después, separado de otras herramientas"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Salvaguarda diseñada junto con quienes proyectan y ejecutan",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "medida definida con proyectista, constructor y subcontratista"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Identificación conjunta de los defectos en las interfaces entre empresas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "medidas comunes en las interfaces"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Incentivo compartido a la prevención",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "el costo del error afecta al conjunto de las partes"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Validación automatizada del modelo contra reglas declaradas en el plan de ejecución BIM",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "validación como condición para publicar"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Verificación en campo contra el modelo con criterio de tolerancia",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "conformidad otorgada contra el modelo"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Campeón BIM como medida preventiva",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "responsable BIM reconocido por la empresa"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "responsable BIM que sostiene la prevención entre las partes"
        }
       ]
      }
     ]
    },
    {
     "codigo": "5.3",
     "nombre_en": "Plan-DO-Check-Act (PDCA) Implementation",
     "nombre_es": "Implementación del ciclo Planificar-Hacer-Verificar-Actuar",
     "descripcion": "capacidad de la empresa para completar el ciclo de mejora con medición antes y después y cerrar la fase Actuar en un estándar documentado. Comprende la circulación del aprendizaje entre obras sucesivas mediante un repositorio con subprocesos formales hasta verificar su eficacia en la obra que lo recibe, la retrospectiva y la revisión de lecciones con las partes, y la vinculación de las lecciones al modelo de forma recuperable.",
     "descriptores": [
      "El ciclo de mejora no está implementado y la evaluación de las mejoras depende de las estrategias de cada persona. Los problemas se corrigen sin medir el antes y el después, y lo aprendido en una obra se pierde al terminarla o queda en la memoria de quienes participaron.",
      "En el proyecto se aplica el ciclo de mejora sobre una unidad de trabajo repetitiva, con medición de su productividad antes y después de la intervención. La forma de evaluar las mejoras que funcionó se repite en proyectos similares, pero el resultado no se convierte en un estándar de la empresa ni se transfiere de forma sistemática a otras obras.",
      "La empresa establece el ciclo Planificar-Hacer-Verificar-Actuar en sus proyectos y en la organización, y la fase Actuar termina en un procedimiento o lista de verificación actualizada con fecha y versión. Un repositorio corporativo captura, analiza, almacena, difunde y reutiliza las lecciones, y cada proyecto nuevo las revisa antes de planificar. El modelo BIM apoya el ciclo: las lecciones se vinculan a elementos y tareas, se validan antes de incorporarse a objetos o plantillas y se consultan en el acervo digital.",
      "La empresa define métricas para la mejora continua. Compara el mismo indicador entre la obra que originó una lección y la que la aplicó, para verificar que el estándar actualizado produjo una mejora, y revisa periódicamente el avance de las medidas comprometidas. Los resultados reales se comparan con los esperados y las brechas se atienden en toda la organización.",
      "Las partes recorren juntas y de forma continua el ciclo de mejora con técnicas BIM, Lean e IPD, como Six Sigma y Plus/Delta, apoyadas en el modelo compartido. El taller de cierre de cada fase se realiza con el cliente, los proyectistas y los subcontratistas, las lecciones quedan disponibles para todas las partes en proyectos futuros y el equipo integrado las revisa en conjunto al iniciar uno nuevo. Las partes identifican las causas raíz y revisan las soluciones de forma continua."
     ],
     "componentes": [
      {
       "codigo": "L1",
       "nombre": "Ciclo completo con medición antes y después sobre unidades comparables",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "●",
         "t": "ciclo aplicado en un proyecto"
        },
        {
         "e": "●",
         "t": "método de la empresa para sus mejoras"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L2",
       "nombre": "Cierre de la fase Actuar en un estándar documentado",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "procedimiento actualizado con fecha y versión"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L3",
       "nombre": "Repositorio corporativo con subprocesos formales y seguimiento de medidas",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "captura, análisis, almacenamiento, difusión y reutilización"
        },
        {
         "e": "●",
         "t": "avance de las medidas comprometidas revisado"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "L4",
       "nombre": "Verificación de eficacia en la obra receptora",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "mismo indicador comparado entre la obra de origen y la receptora"
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "I1",
       "nombre": "Retrospectiva conjunta al cierre de una fase o del proyecto",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "taller de cierre con cliente, proyectistas y subcontratistas"
        }
       ]
      },
      {
       "codigo": "I2",
       "nombre": "Aprendizaje disponible para las partes en proyectos futuros",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "lecciones accesibles a todas las partes"
        }
       ]
      },
      {
       "codigo": "I3",
       "nombre": "Lecciones de proyectos anteriores revisadas con las partes al iniciar uno nuevo",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "revisión interna al iniciar cada proyecto"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "●",
         "t": "revisión conjunta con el equipo integrado"
        }
       ]
      },
      {
       "codigo": "B1",
       "nombre": "Lecciones vinculadas a elementos del modelo y a tareas del cronograma",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "lección asociada al elemento y a la actividad"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B2",
       "nombre": "Extracción, validación e incorporación de la lección a objetos reutilizables",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "lección validada antes de incorporarse a objetos o plantillas"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      },
      {
       "codigo": "B3",
       "nombre": "Consulta del acervo digital por los equipos de proyectos nuevos",
       "niveles": [
        {
         "e": "-",
         "t": ""
        },
        {
         "e": "·",
         "t": ""
        },
        {
         "e": "●",
         "t": "consulta antes de planificar"
        },
        {
         "e": "○",
         "t": ""
        },
        {
         "e": "○",
         "t": ""
        }
       ]
      }
     ]
    }
   ]
  }
 ]
};
