import { ProjectQuestionType, ProjectStatusCode, QuestionValidationType } from "src/app/shared/base";
import { Paginate, Project, ProjectQuestion } from "src/app/shared/models";

export const questionListMock: ProjectQuestion[] = [
  {
    "id": 4,
    "text": "Rubro",
    "type": ProjectQuestionType.Select,
    "parentId": null,
    "options": [
      {
        "id": 28,
        "text": "Almacenes / Centros Logísticos",
        "parentId": null
      },
      {
        "id": 29,
        "text": "Fábricas / Plantas",
        "parentId": null
      }
    ],
    "responses": [
      {
        "id": 2,
        "text": null,
        "questionOptionId": 28
      }
    ],
    "validations": [],
  },
  {
    "id": 5,
    "text": "Tipo de obra",
    "type": ProjectQuestionType.Select,
    "parentId": 4,
    "options": [
      {
        "id": 90,
        "text": "Almacenes / Centros logísticos",
        "parentId": 28
      },
      {
        "id": 91,
        "text": "Plantas/Fábricas",
        "parentId": 29
      }
    ],
    "responses": [
      {
        "id": 3,
        "text": null,
        "questionOptionId": 90
      }
    ],
    "validations": [],
  },
  {
    "id": 1,
    "text": "Etapa de obra",
    "type": ProjectQuestionType.Select,
    "parentId": null,
    "options": [
      {
        "id": 1,
        "text": "Idea",
        "parentId": null
      },
      {
        "id": 2,
        "text": "Perfil",
        "parentId": null
      },
      {
        "id": 3,
        "text": "Ficha Técnica",
        "parentId": null
      },
      {
        "id": 4,
        "text": "Factibilidad",
        "parentId": null
      },
      {
        "id": 5,
        "text": "Expediente Técnico",
        "parentId": null
      },
      {
        "id": 6,
        "text": "Licitación",
        "parentId": null
      }
    ],
    "responses": [
      {
        "id": 4,
        "text": null,
        "questionOptionId": 1
      }
    ],
    "validations": [],
  },
  {
    "id": 2,
    "text": "Etapa de venta",
    "type": ProjectQuestionType.Select,
    "parentId": null,
    "options": [
      {
        "id": 7,
        "text": "Conocimiento",
        "parentId": null
      },
      {
        "id": 8,
        "text": "Seguimiento",
        "parentId": null
      }
    ],
    "responses": [
      {
        "id": 5,
        "text": null,
        "questionOptionId": 8
      }
    ],
    "validations": [],
  },
  {
    "id": 3,
    "text": "Etapa de prospección",
    "type": ProjectQuestionType.Select,
    "parentId": null,
    "options": [
      {
        "id": 9,
        "text": "Identificación",
        "parentId": null
      },
      {
        "id": 10,
        "text": "Especificación - Especificado\r",
        "parentId": null
      },
      {
        "id": 11,
        "text": "Especificación - No especificado\r",
        "parentId": null
      },
      {
        "id": 12,
        "text": "Especificación - Elaboración\r",
        "parentId": null
      },
      {
        "id": 13,
        "text": "Especificación - Evaluación\r",
        "parentId": null
      },
      {
        "id": 14,
        "text": "Stand By",
        "parentId": null
      },
      {
        "id": 15,
        "text": "Revisión",
        "parentId": null
      }
    ],
    "responses": [
      {
        "id": 6,
        "text": null,
        "questionOptionId": 10
      }
    ],
    "validations": [],
  },
  {
    "id": 6,
    "text": "Fecha inicio",
    "type": ProjectQuestionType.Date,
    "parentId": null,
    "options": [],
    "responses": [
      {
        "id": 7,
        "text": "2021-04-06",
        "questionOptionId": null
      }
    ],
    "validations": [
      { id: 1, type: QuestionValidationType.MinDate, message: 'Invalido', parameter: 'feasibilityDate', reference: true },
    ],
  },
  {
    "id": 7,
    "text": "Duración",
    "type": ProjectQuestionType.Integer,
    "parentId": null,
    "options": [],
    "responses": [
      {
        "id": 8,
        "text": "5",
        "questionOptionId": null
      }
    ],
    "validations": [
      { id: 1, type: QuestionValidationType.Min, message: 'Invalido', parameter: '1', reference: false },
      { id: 1, type: QuestionValidationType.Max, message: 'Invalido', parameter: '100', reference: false },
    ],
  },
];

export const projectsMock: Paginate<Project> = {
  pageIndex: 0,
  pageSize: 10,
  items: [
    {
      "id": 6,
      "name": "CREACION (CONSTRUCCIÃ“N) DE LA SEGUNDA CALZADA DE LA RUTA PE-1N, TRAMO: LAMBAYEQUE PIURA EN LA PROVINCIA DE LAMBAYEQUE DEL DEPARTAMENTO DE LAMBAYEQUE Y LA PROVINCIA DE SECHURA DEL DEPARTAMENTO DE PIURA",
      "viableAmount": "2013732521",
      "uniqueInvestmentCode": "65478943",
      "status": {
          "description": "Asignado",
          "code": ProjectStatusCode.Assigned,
      },
      "office": {
          "id": 1,
          "region": {
              "id": 1,
              "name": "Región 1"
          },
      },
      "district": {
          "name": "Piura",
          "province": {
              "name": "Piura",
              "department": {
                  "name": "Piura"
              }
          }
      },
      "projectAssignments": [
          {
              "createdAt": new Date(),
          }
      ],
      "financialUnit": {
        "organization": {
          "name": "Gobierno regional 1"
        },
      },
  },
  {
      "id": 4,
      "name": "MEJORAMIENTO DE RIEGO Y GENERACION HIDROENERGETICO DEL ALTO PIURA",
      "viableAmount": "2272300920",
      "uniqueInvestmentCode": "65478942",
      "status": {
          "description": "Asignado",
          "code": ProjectStatusCode.Assigned,
      },
      "office": {
          "id": 1,
          "region": {
              "id": 1,
              "name": "Región 1"
          },
      },
      "district": {
          "name": "Piura",
          "province": {
              "name": "Piura",
              "department": {
                  "name": "Piura"
              }
          }
      },
      "projectAssignments": [
          {
              "createdAt": new Date(),
          }
      ],
      "financialUnit": {
        "organization": {
          "name": "Gobierno regional 1"
        },
      },
  },
  {
      "id": 5,
      "name": "PROYECTO CHAVIMOCHIC TERCERA ETAPA",
      "viableAmount": "1847407252",
      "uniqueInvestmentCode": "65478941",
      "status": {
          "description": "Asignado",
          "code": ProjectStatusCode.Assigned,
      },
      "office": {
          "id": 2,
          "region": {
              "id": 2,
              "name": "Región 4"
          },
      },
      "district": {
          "name": "Salaverry",
          "province": {
              "name": "Trujillo",
              "department": {
                  "name": "La Libertad"
              }
          }
      },
      "projectAssignments": [
          {
              "createdAt": new Date(),
          }
      ],
      "financialUnit": {
        "organization": {
          "name": "Gobierno regional 1"
        },
      },
    }
  ],
  total: 2,
  totalPages: 1,
};

export const projectMock: Project = {
  "id": 4,
  "uniqueInvestmentCode": "2040186",
  "name": "MEJORAMIENTO DE RIEGO Y GENERACION HIDROENERGETICO DEL ALTO PIURA",
  "priority": "G",
  "viableAmount": "2272300920",
  "feasibilityDate": new Date("2011-04-04T05:00:00.000Z"),
  "updatedAmount": "3331410358",
  "description": "COMPONENTE 1: OBRAS DE TRASVASE QUE COMPRENDE PRESA REGULADORA TRONERA NORTE, TUNEL DE TRASVASE (13.315km) Y CONSTRUCCION DE 92.6 KM DE CAMINOS Y ACCESOS. COMPONENTE2: CONSTRUCCION DE DOS CENTRALES HIDROELECTRICAS: CENTRAL CASHAPITE Y CENTRAL GRAMADAL, COMPONENTE 3: CONSTRUCCIÃ“N DE PRESA MAMAYACO, CANAL DE CONDUCCIÃ“N , SISTEMA DE RIEGO TECNIFICADO DE AREAS NUEVAS (19 MIL NUEVAS HECTAREAS DE CULTIVO) ,COMPONENTE 4: MEJORAMIENTO DE RIEGO DE 31 MIL HECTAREAS DEL VALLE VIEJO (MORROPON)",
  "status": {
    "description": "En Progreso",
    "code": ProjectStatusCode.InProgress,
  },
  "office": {
    "id": 1,
    "name": "Of. Piura",
    "region": {
      "id": 1,
      "name": "Región 1"
    }
  },
  "district": {
    "name": "Piura",
    "province": {
      "name": "Piura",
      "department": {
        "name": "Piura"
      }
    }
  },
  "financialUnit": {
    "id": 1,
    "name": "PROYECTO ESPECIAL DE IRRIGACION E HIDROENERGETICO DEL ALTO PIURA",
    "organization": {
      "name": "GOBIERNO REGIONAL PIURA"
    }
  },
  "speciality": {
    "name": "Transformador"
  },
  "lastStudy": {
    "name": "PERFIL"
  },
  "feasibilityLevel": {
    "name": "PERFIL"
  },
  "projectAssignments": [
    {
      "createdAt": new Date("2024-04-05T17:20:30.633Z"),
    }
  ]
};

export const filtersMock = {
  "status": [
    {
      "id": 2,
      "description": "Asignado",
      "code": "assigned"
    }
  ],
  "regions": [
    {
      "id": 2,
      "name": "Región 4"
    },
    {
      "id": 1,
      "name": "Región 1"
    }
  ],
  "departments": [
    {
      "id": 3,
      "name": "La Libertad"
    },
    {
      "id": 2,
      "name": "Piura"
    }
  ],
  "provinces": [
    {
      "id": 4,
      "name": "Trujillo",
      "departmentId": 3
    },
    {
      "id": 3,
      "name": "Piura",
      "departmentId": 2
    }
  ],
  "districts": [
    {
      "id": 6,
      "name": "Salaverry",
      "provinceId": 4
    },
    {
      "id": 5,
      "name": "Piura",
      "provinceId": 3
    }
  ],
  "amountRanges": [
    {
      "id": 4,
      "minAmount": 50000001,
      "maxAmount": null,
      "currency": {
          "isoCode": "PEN"
      }
    },
  ],
  "dateRange": {
    "maxDate": new Date("2024-04-05T17:20:30.654Z"),
    "minDate": new Date("2024-04-05T17:20:30.633Z")
  }
};
