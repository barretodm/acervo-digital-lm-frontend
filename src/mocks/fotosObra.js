// Dados mockados no formato da tabela "fotos_obra" do DER (AcervoDigitalLM.docx).
// obra_id referencia o id em mocks/obras.js. Apenas uma foto por obra tem capa=true.

import galoAldemir from "../assets/galo-aldemir.jpg";
import galoDois from "../assets/galo-dois.jpg";
import galoTres from "../assets/galo-tres.jpg";

export const fotosObra = [
  // Adriana Varejão
  {
    id: "18756f3e-bf3c-4e0f-bfb4-61fb5591cd23",
    obra_id: "c5494231-4efc-48b3-9466-bcb91ca5cbd9",
    url: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=900&h=1100&fit=crop&auto=format",
    capa: true,
    ordem: 0,
  },
  {
    id: "67dbe3cc-567a-4e79-bf13-1956822cadd7",
    obra_id: "c5494231-4efc-48b3-9466-bcb91ca5cbd9",
    url: "https://images.unsplash.com/photo-1605429523419-d828acb941d9?w=900&h=1100&fit=crop&auto=format",
    capa: false,
    ordem: 1,
  },

  // Ernesto Neto
  {
    id: "d7d09cd8-b2fd-477c-8159-1f0e11e28b32",
    obra_id: "687dadb1-9333-40a3-91e4-f351edb7a749",
    url: "https://images.unsplash.com/photo-1569783721854-33a99b4c0bae?w=900&h=1100&fit=crop&auto=format",
    capa: true,
    ordem: 0,
  },

  // Beatriz Milhazes
  {
    id: "894c37e0-d044-4ae0-86c0-ffdb5eee72a1",
    obra_id: "085fc35b-4f78-47f3-9a51-c7ac72a520b3",
    url: "https://images.unsplash.com/photo-1515169273894-7e876dcf13da?w=900&h=1100&fit=crop&auto=format",
    capa: true,
    ordem: 0,
  },
  {
    id: "e4f973d4-dfb8-4323-a320-65b708e81574",
    obra_id: "085fc35b-4f78-47f3-9a51-c7ac72a520b3",
    url: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=900&h=1100&fit=crop&auto=format",
    capa: false,
    ordem: 1,
  },

  // Vik Muniz
  {
    id: "30d16b6a-9b3d-4b65-b3f1-abc657d6aefa",
    obra_id: "d38d4962-3fa6-4924-8f4d-1ea8c917d71b",
    url: "https://images.unsplash.com/photo-1569084024058-1632922a4e1d?w=900&h=1100&fit=crop&auto=format",
    capa: true,
    ordem: 0,
  },

  // Aldemir Martins, 1972
  {
    id: "a365b7ce-2690-435d-9c9d-bf897bccbc81",
    obra_id: "345e9c16-372a-4232-aa80-a7f726296159",
    url: galoAldemir,
    capa: true,
    ordem: 0,
  },

  // Aldemir Martins, 1984
  {
    id: "a420c272-7753-4568-bd71-7d5077193182",
    obra_id: "90e6d70f-4c93-4569-8173-ae02ef5972d3",
    url: galoDois,
    capa: true,
    ordem: 0,
  },

  // Aldemir Martins, 1953
  {
    id: "39c4c3bf-3478-45e8-baa4-96ec7e98395e",
    obra_id: "f43efa2a-202f-4f52-85a2-696dc5e18a1b",
    url: galoTres,
    capa: true,
    ordem: 0,
  },
];
