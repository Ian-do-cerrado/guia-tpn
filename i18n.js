(function () {
  const KEY = "guia-lang";
  const LANGS = ["pt", "en", "es"];
  const HTML_LANG = { pt: "pt-BR", en: "en", es: "es" };

  const UI = {
    pt: {
      langGroup: "Idioma",
      skip: "Ir para o conteúdo do passo",
      back: "Voltar ao início",
      narrate: "Som",
      narrateOn: "Som ligado. Toque para deixar mudo",
      narrateOff: "Som mudo. Toque para ligar",
      progress: "Progresso do guia",
      replay: "Ver novamente",
      prev: "Voltar",
      next: "Próximo",
      finish: "Concluir",
      again: "Ver de novo",
      statusDone: "Tudo certo · guia concluído",
      doneKicker: "Guia concluído",
      doneTitle: "Você concluiu o guia",
      stepOf: function (n, total) { return "Passo " + n + " de " + total; },
      stepAria: function (n, title) { return "Passo " + n + ": " + title; }
    },
    en: {
      langGroup: "Language",
      skip: "Skip to the step content",
      back: "Back to home",
      narrate: "Sound",
      narrateOn: "Sound on. Tap to mute",
      narrateOff: "Muted. Tap to turn sound on",
      progress: "Guide progress",
      replay: "Watch again",
      prev: "Back",
      next: "Next",
      finish: "Finish",
      again: "Start over",
      statusDone: "All set · guide complete",
      doneKicker: "Guide complete",
      doneTitle: "You finished the guide",
      stepOf: function (n, total) { return "Step " + n + " of " + total; },
      stepAria: function (n, title) { return "Step " + n + ": " + title; }
    },
    es: {
      langGroup: "Idioma",
      skip: "Ir al contenido del paso",
      back: "Volver al inicio",
      narrate: "Sonido",
      narrateOn: "Sonido activado. Toque para silenciar",
      narrateOff: "Silenciado. Toque para activar el sonido",
      progress: "Progreso de la guía",
      replay: "Ver de nuevo",
      prev: "Volver",
      next: "Siguiente",
      finish: "Terminar",
      again: "Ver otra vez",
      statusDone: "Listo · guía completada",
      doneKicker: "Guía completada",
      doneTitle: "Terminó la guía",
      stepOf: function (n, total) { return "Paso " + n + " de " + total; },
      stepAria: function (n, title) { return "Paso " + n + ": " + title; }
    }
  };

  const INDEX = {
    title: {
      pt: "Turista por Natureza · Guias",
      en: "Turista por Natureza · Guides",
      es: "Turista por Natureza · Guías"
    },
    description: {
      pt: "Guias do Turista por Natureza: cadastro, taxa ambiental, reembolso, titularidade, isenção, importar integrantes e comprovante.",
      en: "Turista por Natureza guides: registration, environmental fee, refund, ownership change, importing passengers, and receipt.",
      es: "Guías de Turista por Natureza: registro, tasa ambiental, reembolso, titularidad, importar pasajeros y comprobante."
    },
    heading: { pt: "Material instrutivo do sistema:", en: "System instructional material:", es: "Material instructivo del sistema:" },
    welcome: {
      pt: "Passo a passo para usar o aplicativo na sua viagem. Escolha um tópico e siga na tela, no seu ritmo.",
      en: "A step-by-step path to use the app on your trip. Pick a topic and follow along at your own pace.",
      es: "Paso a paso para usar la aplicación en su viaje. Elija un tema y siga en la pantalla, a su ritmo."
    },
    search: { pt: "Buscar guia", en: "Search guide", es: "Buscar guía" },
    topics: { pt: "Guias", en: "Guides", es: "Guías" },
    empty: { pt: "Nenhum guia encontrado.", en: "No guide found.", es: "No se encontró ninguna guía." },
    logoAlt: { pt: "Turista por natureza", en: "Turista por natureza", es: "Turista por natureza" },
    credit: { pt: "© pedrosoft 2026", en: "© pedrosoft 2026", es: "© pedrosoft 2026" },
    cards: [
      {
        href: "guia-fazer-cadastro.html",
        icon: "user-plus",
        intro: { pt: "Como fazer seu", en: "How to create your", es: "Cómo crear su" },
        key: { pt: "CADASTRO", en: "ACCOUNT", es: "CUENTA" },
        title: { pt: "Como fazer seu cadastro", en: "How to create your account", es: "Cómo crear su cuenta" },
        desc: {
          pt: "Abra Novo Cadastro, preencha os dados obrigatórios e salve.",
          en: "On User login, tap Sign In, fill in the required details, and tap SAVE.",
          es: "En Inicio de sesión de Usuario, toque Nuevo Registro, complete los datos y toque GUARDAR."
        },
        meta: { pt: "3 passos · com narração", en: "3 steps · with narration", es: "3 pasos · con narración" },
        search: "cadastro conta novo login nome cpf documento salvar signup register account"
      },
      {
        href: "guia-taxa-ambiental.html",
        icon: "leaf",
        intro: { pt: "Como pagar a", en: "How to pay the", es: "Cómo pagar la" },
        key: { pt: "TAXA DE CONSERVAÇÃO AMBIENTAL", en: "ENVIRONMENTAL CONSERVATION FEE", es: "TASA DE CONSERVACIÓN AMBIENTAL" },
        title: { pt: "Como pagar a Taxa de Conservação Ambiental", en: "How to pay the Environmental Conservation Fee", es: "Cómo pagar la tasa de conservación ambiental" },
        desc: {
          pt: "Crie o grupo e pague a Taxa de Conservação Ambiental.",
          en: "Create the group and pay the environmental fee.",
          es: "Cree el grupo y pague la tasa ambiental."
        },
        meta: { pt: "3 passos · com narração", en: "3 steps · with narration", es: "3 pasos · con narración" },
        search: "pagar pagamento taxa ambiental grupo cartao pix comprovante pay fee environmental card"
      },
      {
        href: "guia-pedido-reembolso.html",
        icon: "refresh",
        intro: { pt: "Como cancelar", en: "How to cancel a", es: "Cómo cancelar un" },
        key: { pt: "PAGAMENTO", en: "PAYMENT", es: "PAGO" },
        title: { pt: "Como cancelar pagamento", en: "How to cancel a payment", es: "Cómo cancelar un pago" },
        desc: {
          pt: "Abra a taxa ambiental, solicite a devolução e confirme no pagamento.",
          en: "Open the environmental fee, tap Request refund or History, and confirm on Details.",
          es: "Abra la tasa ambiental, toque Solicitar devolución o Historia, y confirme en Detalles."
        },
        meta: { pt: "3 passos · com narração", en: "3 steps · with narration", es: "3 pasos · con narración" },
        search: "reembolso devolucao devolver pagamento dinheiro refund payment money devolución"
      },
      {
        href: "guia-reembolso-parcial.html",
        icon: "refresh",
        intro: { pt: "Como pedir o", en: "How to request a", es: "Cómo pedir el" },
        key: { pt: "REEMBOLSO PARCIAL", en: "PARTIAL REFUND", es: "REEMBOLSO PARCIAL" },
        title: { pt: "Como pedir o reembolso parcial", en: "How to request a partial refund", es: "Cómo pedir el reembolso parcial" },
        desc: {
          pt: "Cancele diárias específicas na taxa ambiental e envie para análise manual.",
          en: "Cancel specific fee days on the environmental tax and submit for review.",
          es: "Cancele días específicos en la taxa ambiental y envíe para revisión manual."
        },
        meta: { pt: "4 passos · com narração", en: "4 steps · with narration", es: "4 passos · con narración" },
        search: "reembolso parcial devolver diarias devolução diárias cancelar partial refund days"
      },
      {
        href: "guia-mudanca-titularidade.html",
        icon: "swap",
        intro: { pt: "Como mudar o", en: "How to change the", es: "Cómo cambiar el" },
        key: { pt: "TITULAR DA TAXA OU DATA", en: "FEE HOLDER OR DATE", es: "TITULAR DE LA TASA O LA FECHA" },
        title: { pt: "Como mudar o titular da taxa ou data", en: "How to change the fee holder or date", es: "Cómo cambiar el titular de la tasa" },
        desc: {
          pt: "Transfira a taxa ambiental de uma pessoa para outra no grupo.",
          en: "On Environmental Tax, tap Change in paid days or holder, then Fee Holder Change.",
          es: "En Impuesto Ambiental, toque Cambio de días pagados o titular y luego Cambio de Titular de la Tasa."
        },
        meta: { pt: "4 passos · com narração", en: "4 steps · with narration", es: "4 pasos · con narración" },
        search: "titular titularidade transferir mudar troca pessoa data datas date holder ownership change transfer"
      },
      {
        href: "guia-isencao-bonitense.html",
        icon: "shield",
        intro: { pt: "Como pedir", en: "How to request a", es: "Cómo pedir la" },
        key: { pt: "ISENÇÃO DA TAXA", en: "FEE EXEMPTION", es: "EXENCIÓN DE LA TASA" },
        note: { pt: "(moradores de Bonito)", en: "(Bonito residents)", es: "(residentes de Bonito)" },
        title: { pt: "Como pedir isenção da taxa (moradores de Bonito)", en: "How to request a fee exemption (Bonito residents)", es: "Cómo pedir la exención de la tasa (residentes de Bonito)" },
        desc: {
          pt: "Residente de Bonito solicita isenção com documento e comprovante de residência.",
          en: "A Bonito resident requests an exemption with ID and proof of residence.",
          es: "Un residente de Bonito solicita la exención con documento y comprobante de residencia."
        },
        meta: { pt: "4 passos · com narração", en: "4 steps · with narration", es: "4 pasos · con narración" },
        search: "isencao insencao bonitense morador residente bonito documentos comprovante exemption resident",
        langs: ["pt"]
      },
      {
        href: "guia-importar-integrantes.html",
        icon: "qr",
        intro: { pt: "Como importar", en: "How to import", es: "Cómo importar" },
        key: { pt: "INTEGRANTES", en: "PASSENGERS", es: "PASAJEROS" },
        title: { pt: "Como importar integrantes", en: "How to import passengers", es: "Cómo importar pasajeros" },
        desc: {
          pt: "Traga para o grupo quem já tem cadastro, pelo QR Code ou pelo documento.",
          en: "On PASSENGERS, open Passenger's Profile and import by QR Code or document number.",
          es: "En PASAJEROS, abra Perfil del pasajero e importe por código QR o Núm. de documento."
        },
        meta: { pt: "3 passos · com narração", en: "3 steps · with narration", es: "3 pasos · con narración" },
        search: "importar integrantes passageiros qr code documento cadastro grupo import members passengers"
      },
      {
        href: "guia-imprimir-comprovante.html",
        icon: "printer",
        intro: { pt: "Como imprimir o", en: "How to print the", es: "Cómo imprimir el" },
        key: { pt: "COMPROVANTE", en: "RECEIPT", es: "COMPROBANTE" },
        title: { pt: "Como imprimir o comprovante", en: "How to print the receipt", es: "Cómo imprimir el comprobante" },
        desc: {
          pt: "Abra o pedido pago da taxa ambiental e imprima o recibo oficial.",
          en: "Open History, tap a Paid order, and print the official receipt.",
          es: "Abra Historia, toque un pedido Pagado e imprima el comprobante oficial."
        },
        meta: { pt: "4 passos · com narração", en: "4 steps · with narration", es: "4 pasos · con narración" },
        search: "imprimir comprovante recibo pdf impressao historico pago print receipt voucher paid"
      }
    ]
  };

  const GUIDES = {
    taxa: {
      title: { pt: "Como pagar a Taxa de Conservação Ambiental", en: "How to pay the Environmental Conservation Fee", es: "Cómo pagar la tasa de conservación ambiental" },
      description: {
        pt: "Guia passo a passo para criar o grupo e pagar a Taxa de Conservação Ambiental de Bonito.",
        en: "Step-by-step guide to create the group and pay Bonito's Environmental Conservation Fee.",
        es: "Guía paso a paso para crear el grupo y pagar la Tasa de Conservación Ambiental de Bonito."
      },
      lede: {
        pt: "Turista por Natureza · crie o grupo e pague a taxa",
        en: "Turista por Natureza · create the group and pay the fee",
        es: "Turista por Natureza · cree el grupo y pague la tasa"
      },
      statusDone: {
        pt: "Tudo certo · confira o status Pago",
        en: "All set · check the Paid status",
        es: "Listo · compruebe el estado Pagado"
      },
      doneNarrate: {
        pt: "Guia concluído. Você criou o grupo e pagou a taxa. No aplicativo, confira se o status ficou Pago.",
        en: "Guide complete. You created the group and paid the fee. In the app, check that the status is Paid.",
        es: "Guía completada. Creó el grupo y pagó la tasa. En la aplicación, compruebe que el estado quedó Pagado."
      },
      doneLead: {
        pt: "Crie o grupo, pague a taxa e só saia da tela depois de ver o status Pago.",
        en: "Create the group, pay the fee, and leave the screen only after you see the status Paid.",
        es: "Cree el grupo, pague la tasa y salga de la pantalla solo después de ver el estado Pagado."
      },
      doneTipLabel: { pt: "Pix", en: "Pix", es: "Pix" },
      doneTipHtml: {
        pt: "No passo <b>Modo</b>, a aba Pix gera o QR para pagar no app do banco. Sem dia marcado, o botão <b>Pagar</b> não aparece.",
        en: "In the <b>Method</b> step, the Pix tab creates a QR code. Pay in the bank app within the time shown. Without a marked day, the <b>Pay</b> button does not appear.",
        es: "En el paso <b>Método</b>, la pestaña Pix genera un código QR. Pague en la app del banco dentro del tiempo indicado. Sin un día marcado, el botón <b>Pagar</b> no aparece."
      },
      steps: [
        {
          title: { pt: "Crie o grupo e entre", en: "Create the group and enter", es: "Cree el grupo y entre" },
          narrate: {
            pt: "Feche o aviso, se aparecer. Abra a aba grupos. Toque no mais. Confira o período De e Até e toque em Salvar. Depois toque em Logar no grupo. Confira as datas do período antes de salvar.",
            en: "Open the trip group. Or create it: tap plus, check Start and End, tap Save Group, then group login.",
            es: "Abra el grupo del viaje. O créelo: toque más, marque Inicio y Fin, toque Guardar grupo y luego inicie sesión en el grupo."
          },
          alt: {
            pt: "Aba grupos, formulário do período e o botão Logar no grupo.",
            en: "Group's Data, with Start and End dates and the Fees and services button.",
            es: "Datos del grupo, con las fechas Inicio y Fin y el botón Tasas y servicios."
          },
          howto: [
            { pt: "Feche o aviso <b>Cadastro realizado com sucesso</b>, se aparecer, e abra a aba <b>grupos</b>.", en: "Open the trip <b>group</b>. If a success notice appears, close it.", es: "Abra el <b>grupo</b> del viaje. Si aparece un aviso de éxito, ciérrelo." },
            { pt: "Toque no <b>+</b>. Confira o período <b>De</b> e <b>Até</b> e toque em <b>Salvar</b>.", en: "To create a group, tap <b>+</b>. Check <b>Start</b> and <b>End</b> and tap <b>Save Group</b>.", es: "Para crear un grupo, toque <b>+</b>. Marque <b>Inicio</b> y <b>Fin</b> y toque <b>Guardar grupo</b>." },
            { pt: "Toque em <b>Logar no grupo</b>.", en: "Then tap group <b>login</b>. On <b>Group's Data</b>, you will see <b>Fees and services</b>.", es: "Luego inicie sesión en el grupo. En <b>Datos del grupo</b> verá <b>Tasas y servicios</b>." }
          ],
          tipLabel: { pt: "Sem cadastro", en: "No account yet", es: "Sin cuenta" },
          tipHtml: {
            pt: "O passo a passo da conta está no guia <b>Como fazer seu cadastro</b>. Este guia usa o caminho clássico — não o atalho <b>Pagar minha Tx. Ambiental</b>.",
            en: "The account steps are in the <b>How to create your account</b> guide. This guide uses the classic path — not the <b>Pay my Env. Tax</b> shortcut.",
            es: "El paso a paso de la cuenta está en la guía <b>Cómo crear su cuenta</b>. Esta guía usa el camino clásico — no el atajo <b>Pagar mi Tx. Ambiental</b>."
          }
        },
        {
          title: { pt: "Abra a taxa e toque em Pagar", en: "Open the fee and tap Pay", es: "Abra la tasa y toque Pagar" },
          narrate: {
            pt: "Toque em Taxas e serviços. Depois toque em Taxa de Conservação Ambiental de Bonito. Na matriz, confira os dias marcados e o Valor a pagar. Toque em Pagar.",
            en: "On Group's Data, tap Fees and services. Then tap Bonito's Environmental Conservation Fee. On the grid, check the marked days and Amount due. Tap Pay.",
            es: "En Datos del grupo, toque Tasas y servicios. Después toque Tasa de Conservación Ambiental de Bonito. En la grilla, revise los días marcados y el Valor a pagar. Toque Pagar."
          },
          alt: {
            pt: "No grupo, o ponteiro abre Taxas e serviços, escolhe a taxa e toca em Pagar.",
            en: "In the group, the pointer opens Fees and services, chooses the fee, and taps Pay.",
            es: "En el grupo, el puntero abre Tasas y servicios, elige la tasa y toca Pagar."
          },
          howto: [
            { pt: "Toque em <b>Taxas e serviços</b> e depois em <b>Taxa de Conservação Ambiental de Bonito</b>.", en: "On <b>Group's Data</b>, tap <b>Fees and services</b> and then <b>Bonito's Environmental Conservation Fee</b>.", es: "En <b>Datos del grupo</b>, toque <b>Tasas y servicios</b> y después <b>Tasa de Conservación Ambiental de Bonito</b>." },
            { pt: "Na matriz, confira o <b>Valor a pagar</b>.", en: "On the grid, check <b>Amount due</b>.", es: "En la matriz, confirme el <b>Valor a pagar</b>." },
            { pt: "Toque em <b>Pagar</b>.", en: "Tap <b>Pay</b>.", es: "Toque <b>Pagar</b>." }
          ],
          tipLabel: { pt: "Sem o botão Pagar", en: "If Pay is missing", es: "Si no aparece Pagar" },
          tipHtml: {
            pt: "Sem dia marcado, o botão <b>Pagar</b> não aparece. O botão fica no alto da tela Dados do grupo, à direita.",
            en: "Without a marked day, the <b>Pay</b> button does not appear. Mark the stay dates on the grid first. <b>Fees and services</b> is at the top of <b>Group's Data</b>, on the right.",
            es: "Sin un día marcado, el botón <b>Pagar</b> no aparece. Marque primero las fechas de la estadía en la grilla. <b>Tasas y servicios</b> está arriba en <b>Datos del grupo</b>, a la derecha."
          }
        },
        {
          title: { pt: "Pague com cartão e confira Pago", en: "Pay by card and check Paid", es: "Pague con tarjeta y confirme Pagado" },
          narrate: {
            pt: "Em Dados pagamento, confira o nome e toque em Prosseguir. Em Modo, toque na aba Cartão. Confira os dados e toque em Prosseguir. No passo Finalizado, o status deve ser Pago. Toque em Imprimir Comprovante se quiser o recibo, ou em Fechar.",
            en: "In Payment data, check the name and tap Next. In Method, tap Card (or Pix to pay in the bank app). Fill in the card details and tap Next. In the Done step, check the status Paid. Tap Print Receipt if you want the receipt, or Close.",
            es: "En Detalles del pago, confirme el nombre y toque Continuar. En Método, toque Tarjeta (o Pix para pagar en la app del banco). Complete los datos de la tarjeta y toque Continuar. En el paso Finalizado, compruebe el estado Pagado. Toque Imprimir Comprobante si quiere el recibo, o Cerrar."
          },
          alt: {
            pt: "Pagamento no cartão e a tela Finalizado com o status Pago e Imprimir Comprovante.",
            en: "Card payment and the Done screen with the Paid status and Print Receipt.",
            es: "Pago con tarjeta y la pantalla Finalizado con el estado Pagado e Imprimir Comprobante."
          },
          howto: [
            { pt: "Em <b>Dados pagamento</b>, confira o nome e toque em <b>Prosseguir</b>.", en: "In <b>Payment data</b>, check the name and tap <b>Next</b>.", es: "En <b>Detalles del pago</b>, confirme el nombre y toque <b>Continuar</b>." },
            { pt: "Em <b>Modo</b>, toque na aba <b>Cartão</b> e depois em <b>Prosseguir</b>.", en: "In <b>Method</b>, tap the <b>Card</b> tab and then <b>Next</b>.", es: "En <b>Método</b>, toque la pestaña <b>Tarjeta</b> y después <b>Continuar</b>." },
            { pt: "No passo <b>Finalizado</b>, confira o status <b>Pago</b>. Toque em <b>Imprimir Comprovante</b> ou em <b>Fechar</b>.", en: "In the <b>Done</b> step, check the status <b>Paid</b>. Tap <b>Print Receipt</b> or <b>Close</b>.", es: "En el paso <b>Finalizado</b>, compruebe el estado <b>Pagado</b>. Toque <b>Imprimir Comprobante</b> o <b>Cerrar</b>." }
          ],
          tipLabel: { pt: "Pix", en: "Pix", es: "Pix" },
          tipHtml: {
            pt: "No mesmo passo <b>Modo</b>, a aba <b>Pix</b> gera o QR para pagar no app do banco.",
            en: "In the same <b>Method</b> step, the <b>Pix</b> tab creates a QR code. Pay in the bank app within the time shown.",
            es: "En el mismo paso <b>Método</b>, la pestaña <b>Pix</b> genera un código QR. Pague en la app del banco dentro del tiempo indicado."
          }
        }
      ]
    },
    cadastro: {
      title: { pt: "Como fazer seu cadastro", en: "How to create your account", es: "Cómo crear su cuenta" },
      description: {
        pt: "Guia passo a passo para criar sua conta no Turista por Natureza.",
        en: "Step-by-step guide to create your account in Turista por Natureza.",
        es: "Guía paso a paso para crear su cuenta en Turista por Natureza."
      },
      lede: {
        pt: "Turista por Natureza · crie sua conta para usar o aplicativo",
        en: "Turista por Natureza · create your account to use the app",
        es: "Turista por Natureza · cree su cuenta para usar la aplicación"
      },
      doneNarrate: {
        pt: "Guia concluído. Depois de salvar, use o documento e a senha ou o celular para entrar. Em seguida, dá para criar o grupo e pagar a taxa ambiental.",
        en: "Guide complete. After saving, use the document and the password or mobile number to sign in. Then you can create the group and pay the environmental fee.",
        es: "Guía completada. Después de guardar, use el documento y la contraseña o el número de celular para iniciar sesión. Luego puede crear el grupo y pagar la tasa de conservación ambiental."
      },
      doneLead: {
        pt: "Com o cadastro salvo, entre com o documento e a senha ou o celular. Depois crie o grupo e pague a taxa ambiental.",
        en: "With the registration saved, sign in with the document and the password or mobile number. Then create the group and pay the environmental fee.",
        es: "Con el registro guardado, inicie sesión con el documento y la contraseña o el número de celular. Luego cree el grupo y pague la tasa de conservación ambiental."
      },
      doneTipLabel: { pt: "Documento já cadastrado", en: "Document already registered", es: "Documento ya registrado" },
      doneTipHtml: {
        pt: "Se o documento já existir, o app pergunta se quer <b>importar os dados</b>.",
        en: "If the document already exists, the app asks whether you want to <b>import the data</b>.",
        es: "Si el documento ya existe, la aplicación pregunta si quiere <b>importar los datos</b>."
      },
      steps: [
        {
          title: { pt: "Toque em Novo Cadastro", en: "Tap Sign In", es: "Toque Nuevo Registro" },
          narrate: {
            pt: "Na tela de login, toque em Novo Cadastro.",
            en: "On the User login screen, tap Sign In. At the top, tap English if it is not already selected.",
            es: "En Inicio de sesión de Usuario, toque Nuevo Registro. Arriba, toque Español si aún no está seleccionado."
          },
          alt: {
            pt: "Tela de login do Turista por Natureza, com o ponteiro no botão Novo Cadastro.",
            en: "Turista por Natureza User login screen, with English selected and the pointer on Sign In.",
            es: "Pantalla Inicio de sesión de Usuario de Turista por Natureza, con Español seleccionado y el puntero en Nuevo Registro."
          },
          howto: [
            { pt: "Abra o aplicativo ou o site <b>Turista por Natureza</b>.", en: "Open the <b>Turista por Natureza</b> app or website.", es: "Abra la aplicación o el sitio <b>Turista por Natureza</b>." },
            { pt: "Na tela de login, toque em <b>Novo Cadastro</b>.", en: "At the top, tap <b>English</b> if it is not already selected. On <b>User login</b>, tap <b>Sign In</b>.", es: "Arriba, toque <b>Español</b> si aún no está seleccionado. En <b>Inicio de sesión de Usuario</b>, toque <b>Nuevo Registro</b>." }
          ],
          tipLabel: { pt: "Já tem cadastro?", en: "Already registered?", es: "¿Ya tiene cuenta?" },
          tipHtml: {
            pt: "Se vier de Pagar minha Tx. Ambiental, toque em <b>Sim</b> para voltar ao login ou em <b>Não</b> para o mesmo formulário.",
            en: "If you came from Pay my Env. Tax, tap <b>Yes</b> to return to login or <b>No</b> for the same form.",
            es: "Si llegó desde <b>Pagar mi Tx. Ambiental</b>, toque <b>Sí</b> para volver al login o <b>No</b> para el mismo formulario."
          }
        },
        {
          title: { pt: "Preencha os campos obrigatórios", en: "Fill in the required fields", es: "Complete los campos obligatorios" },
          narrate: {
            pt: "Preencha os campos obrigatórios, os que têm asterisco. Informe o nome. Escolha o sexo. Informe a data de nascimento. No Brasil, o tipo de documento é o CPF. Digite o número do documento. Confira o país. Escolha o estado. Depois escolha a cidade. Siga a ordem da tela, de cima para baixo.",
            en: "Fill in the required fields, the ones with an asterisk. Enter Name. Choose Gender. Enter Birthdate. In Brazil, the document type is CPF. Type the document number. Check Country. Choose ST. Then choose City. Follow the order on the screen, from top to bottom.",
            es: "Complete los campos obligatorios, los que tienen asterisco. Informe Nombre. Elija Sexo. Informe Fecha de nacimiento. En Brasil, el tipo de documento es CPF. Escriba Núm. de documento. Confirme País. Elija prov. Después elija Ciudad. Siga el orden de la pantalla, de arriba hacia abajo."
          },
          alt: {
            pt: "Formulário de cadastro, com nome, sexo, nascimento, CPF, país, UF e cidade. O ponteiro indica os campos obrigatórios.",
            en: "Registration form, with Name, Gender, Birthdate, CPF, Country, ST, and City. The pointer highlights the required fields.",
            es: "Formulario de registro, con Nombre, Sexo, Fecha de nacimiento, DNI, País, prov. y Ciudad. El puntero indica los campos obligatorios."
          },
          howto: [
            { pt: "Preencha <b>Nome</b>, <b>Sexo</b> e <b>Nascimento</b>.", en: "Fill in <b>Name</b>, <b>Gender</b>, and <b>Birthdate</b>.", es: "Complete <b>Nombre</b>, <b>Sexo</b> y <b>Fecha de nacimiento</b>." },
            { pt: "Informe o tipo e o número do <b>documento</b>. No Brasil, use o CPF.", en: "Enter the <b>document</b> type and number. In Brazil, use the CPF.", es: "Informe el tipo de <b>documento</b> y el <b>Núm. de documento</b>. En Brasil, use el CPF." },
            { pt: "Confira <b>País</b>, <b>UF</b> e <b>Cidade</b>.", en: "Check <b>Country</b>, <b>ST</b>, and <b>City</b>.", es: "Confirme <b>País</b>, <b>prov.</b> y <b>Ciudad</b>." }
          ],
          tipLabel: { pt: "Nome", en: "Name", es: "Nombre" },
          tipHtml: {
            pt: "Use nome e sobrenome, se o app pedir.",
            en: "Use first and last name if the app asks for them.",
            es: "Use nombre y apellido, si la aplicación lo pide."
          }
        },
        {
          title: { pt: "Dados opcionais e salvar", en: "Optional Data and SAVE", es: "Datos Opcionales y GUARDAR" },
          narrate: {
            pt: "Abaixo ficam os dados opcionais. Role até o fim e toque em Salvar.",
            en: "Optional Data is below. Scroll to the end and tap SAVE.",
            es: "Abajo están Datos Opcionales. Desplácese hasta el final y toque GUARDAR."
          },
          alt: {
            pt: "Final do cadastro, com Dados Opcionais e o ponteiro no botão SALVAR.",
            en: "End of the registration, with Optional Data and the pointer on the SAVE button.",
            es: "Final del registro, con Datos Opcionales y el puntero en el botón GUARDAR."
          },
          howto: [
            { pt: "Se quiser, preencha <b>celular</b>, <b>e-mail</b> e <b>senha</b> em Dados Opcionais.", en: "If you want, fill in <b>phone</b>, <b>email</b>, and <b>password</b> under Optional Data.", es: "Si quiere, complete <b>teléfono</b>, <b>correo electrónico</b> y <b>contraseña</b> en Datos Opcionales." },
            { pt: "Se o cadastro for seu, desmarque <b>permitir alteração por terceiros</b>.", en: "If this registration is yours, uncheck <b>Allow changes to the registration by third-parties?</b>.", es: "Si este registro es suyo, deje desmarcada <b>¿Permitir modificación del registro por terceros?</b>." },
            { pt: "Role até o fim e toque em <b>SALVAR</b>.", en: "Scroll to the end and tap <b>SAVE</b>.", es: "Desplácese hasta el final y toque <b>GUARDAR</b>." }
          ],
          tipLabel: { pt: "Senha", en: "Password", es: "Contraseña" },
          tipHtml: {
            pt: "Se a senha ficar em branco, o celular pode valer como senha.",
            en: "If you leave the password blank, the mobile number can work as the password.",
            es: "Si la contraseña queda en blanco, el celular puede valer como contraseña."
          }
        }
      ]
    },
    reembolso_parcial: {
      title: { pt: "Como pedir o reembolso parcial", en: "How to request a partial refund", es: "Cómo pedir el reembolso parcial" },
      description: {
        pt: "Guia passo a passo para solicitar a devolução de diárias da taxa ambiental no Turista por Natureza.",
        en: "Step-by-step guide to request a partial refund of fee days in Turista por Natureza.",
        es: "Guía paso a paso para solicitar la devolución de diarias de la tasa ambiental en Turista por Natureza."
      },
      lede: {
        pt: "Turista por Natureza · cancele diárias específicas da taxa ambiental",
        en: "Turista por Natureza · cancel specific days of the environmental fee",
        es: "Turista por Natureza · cancele días específicos de la tasa ambiental"
      },
      doneNarrate: {
        pt: "Guia concluído. A solicitação de devolução de diárias foi enviada com sucesso! O pedido passará por análise manual da prefeitura. Você pode acompanhar o andamento na aba Solicitações de reembolso, no histórico da taxa.",
        en: "Guide complete. The day refund request was successfully sent! The request will be reviewed manually by the city hall. You can track progress in the Refund requests tab, in the fee History.",
        es: "Guía completada. ¡La solicitud de devolución de diarias fue enviada con éxito! El pedido pasará por revisión manual de la municipalidad. Puede seguir el estado en Solicitudes de reembolso, en la Historia de la tasa."
      },
      doneLead: {
        pt: "A solicitação de devolução de diárias foi enviada para análise manual da prefeitura. Acompanhe o andamento na aba Solicitações de reembolso, no histórico da taxa.",
        en: "The day refund request has been sent for manual review by the city hall. Track the progress in the Refund requests tab in History.",
        es: "La solicitud de devolución de diarias fue enviada para revisión manual de la municipalidad. Siga el estado en la pestaña Solicitudes de reembolso en Historia."
      },
      doneTipLabel: { pt: "Análise da prefeitura", en: "City Hall Review", es: "Revisión municipal" },
      doneTipHtml: {
        pt: "Diferente do cancelamento total, a devolução parcial de diárias passa por conferência manual do município.",
        en: "Unlike total payment refund, partial day refund undergoes manual review by the municipality.",
        es: "A diferencia de la cancelación total, la devolución parcial de diarias pasa por verificación manual del municipio."
      },
      steps: [
        {
          title: { pt: "Acesse a Taxa Ambiental", en: "Access the Environmental Fee", es: "Acceda a la Tasa Ambiental" },
          narrate: {
            pt: "Passo 1. Acesse a Taxa Ambiental. No grupo da viagem, toque em Taxas e serviços. Em seguida, toque em Taxa de Conservação Ambiental de Bonito.",
            en: "Step 1. Access the Environmental Fee. In the trip group, tap Fees and services. Then tap Bonito's Environmental Conservation Fee.",
            es: "Paso 1. Acceda a la Tasa Ambiental. En el grupo del viaje, toque Tasas y servicios. Después toque Tasa de Conservación Ambiental de Bonito."
          },
          alt: {
            pt: "No grupo da viagem, o ponteiro toca em Taxas e serviços e depois em Taxa de Conservação Ambiental de Bonito.",
            en: "In the trip group, the pointer taps Fees and services and then Bonito's Environmental Conservation Fee.",
            es: "En el grupo del viaje, el puntero toca Tasas y servicios y luego Tasa de Conservación Ambiental de Bonito."
          },
          howto: [
            { pt: "Abra o <b>grupo</b> da viagem.", en: "Open the trip <b>group</b>.", es: "Abra el <b>grupo</b> del viaje." },
            { pt: "Toque em <b>Taxas e serviços</b>.", en: "Tap <b>Fees and services</b>.", es: "Toque <b>Tasas y servicios</b>." },
            { pt: "Toque em <b>Taxa de Conservação Ambiental de Bonito</b>.", en: "Tap <b>Bonito's Environmental Conservation Fee</b>.", es: "Toque <b>Tasa de Conservación Ambiental de Bonito</b>." }
          ],
          tipLabel: { pt: "Onde começar", en: "Where to start", es: "Dónde empezar" },
          tipHtml: {
            pt: "O botão Taxas e serviços fica no canto superior direito da tela Dados do grupo.",
            en: "The Fees and services button is in the top right corner of Group's Data.",
            es: "El botón Tasas y servicios está arriba a la derecha en Datos del grupo."
          }
        },
        {
          title: { pt: "Escolha Devolução de diárias", en: "Choose Day refund", es: "Elija Devolución de diarias" },
          narrate: {
            pt: "Passo 2. Escolha Devolução de diárias. Na tela da taxa ambiental, toque no botão laranja Solicitar devolução. Depois escolha Solicitar devolução de diárias.",
            en: "Step 2. Choose Day refund. On the environmental fee screen, tap the orange Request refund button. Then choose Request day refund.",
            es: "Paso 2. Elija Devolución de diarias. En la pantalla de la taxa ambiental, toque el botón naranja Solicitar devolución. Después elija Solicitar devolución de diarias."
          },
          alt: {
            pt: "Na taxa ambiental, o ponteiro toca em Solicitar devolução e escolhe Solicitar devolução de diárias.",
            en: "On the environmental fee screen, the pointer taps Request refund and chooses Request day refund.",
            es: "En la tasa ambiental, el puntero toca Solicitar devolución y elige Solicitar devolución de diarias."
          },
          howto: [
            { pt: "Confira se o status da taxa está <b>Pago</b>.", en: "Check that the fee status is <b>Paid</b>.", es: "Compruebe que el estado esté <b>Pagado</b>." },
            { pt: "Toque no botão laranja <b>Solicitar devolução</b>.", en: "Tap the orange <b>Request refund</b> button.", es: "Toque el botón naranja <b>Solicitar devolución</b>." },
            { pt: "Selecione a opção <b>Solicitar devolução de diárias</b>.", en: "Choose <b>Request day refund</b>.", es: "Elija <b>Solicitar devolución de diarias</b>." }
          ],
          tipLabel: { pt: "Atenção à opção", en: "Option note", es: "Atención a la opción" },
          tipHtml: {
            pt: "Solicitar devolução de pagamento estorna o valor total. Devolução de diárias cancela apenas dias específicos.",
            en: "Request payment refund returns total amount. Request day refund cancels specific days only.",
            es: "Solicitar devolución de pago devuelve el total. Devolución de diarias cancela solo días específicos."
          }
        },
        {
          title: { pt: "Selecione as diárias", en: "Select the fee days", es: "Seleccione las diarias" },
          narrate: {
            pt: "Passo 3. Selecione as diárias. Na grade, marque as diárias dos passageiros que deseja cancelar. Depois, toque em Solicitar devolução de diárias no rodapé.",
            en: "Step 3. Select the fee days. On the grid, check the passenger days you want to refund. Then tap Request day refund at the bottom.",
            es: "Paso 3. Seleccione las diarias. En la grilla, marque los días de los pasajeros que desea cancelar. Después toque Solicitar devolución de diarias abajo."
          },
          alt: {
            pt: "Na grade de diárias, o ponteiro marca as caixas de seleção das diárias dos passageiros e clica no botão laranja Solicitar devolução de diárias.",
            en: "On the grid, the pointer checks the passenger day checkboxes and taps orange Request day refund.",
            es: "En la grilla, el puntero marca las casillas de días de pasajeros y toca el botón naranja Solicitar devolución de diarias."
          },
          howto: [
            { pt: "Na grade, localize as linhas dos passageiros.", en: "On the grid, locate the passenger rows.", es: "En la grilla, localice las filas de los pasajeros." },
            { pt: "Marque as diárias (quadradinhos) que deseja cancelar.", en: "Check the day boxes you want to refund.", es: "Marque los días (casillas) que desea cancelar." },
            { pt: "Toque no botão laranja <b>Solicitar devolução de diárias</b> no rodapé.", en: "Tap the orange <b>Request day refund</b> button at the bottom.", es: "Toque el botón naranja <b>Solicitar devolución de diarias</b> abajo." }
          ],
          tipLabel: { pt: "Cancelamento flexível", en: "Flexible cancellation", es: "Cancelación flexible" },
          tipHtml: {
            pt: "Você pode selecionar diárias de um único passageiro ou de vários integrantes do grupo ao mesmo tempo.",
            en: "You can select days for one passenger or for multiple trip members at once.",
            es: "Puede seleccionar días de un solo pasajero o de varios integrantes a la vez."
          }
        },
        {
          title: { pt: "Preencha os dados e envie", en: "Fill in details and send", es: "Complete los datos y envíe" },
          narrate: {
            pt: "Passo 4. Preencha os dados e envie. Informe o CPF ou CNPJ, selecione o banco, informe agência, conta e titular. Escreva a justificativa e toque em Enviar.",
            en: "Step 4. Fill in the details and submit. Enter the ID number, select the bank, type the branch, account, and account holder. Type the reason and tap Send.",
            es: "Paso 4. Complete los datos y envíe. Ingrese el documento, elija el banco, escriba sucursal, cuenta y titular. Escriba el motivo y toque Enviar."
          },
          alt: {
            pt: "No formulário de reembolso, são preenchidos o CPF, banco, agência, conta, titular e a justificativa, e o ponteiro clica em Enviar.",
            en: "On the refund form, tax ID, bank, branch, account, holder, and reason are filled, and the pointer taps Send.",
            es: "En el formulario de devolución, se completan documento, banco, sucursal, cuenta, titular y motivo, y el puntero toca Enviar."
          },
          howto: [
            { pt: "Informe o <b>CPF/CNPJ</b> e selecione o <b>Banco</b>.", en: "Enter the <b>Tax ID (CPF/CNPJ)</b> and select the <b>Bank</b>.", es: "Ingrese el <b>documento (CPF/CNPJ)</b> y elija el <b>Banco</b>." },
            { pt: "Preencha <b>Agência</b>, <b>Conta</b> e o nome do <b>Titular</b>.", en: "Fill in <b>Branch</b>, <b>Account</b>, and <b>Holder Name</b>.", es: "Complete <b>Sucursal</b>, <b>Cuenta</b> y <b>Titular</b>." },
            { pt: "Escreva a <b>Justificativa</b> e toque em <b>Enviar</b>.", en: "Enter the <b>Reason</b> and tap <b>Send</b>.", es: "Escriba el <b>Motivo</b> y toque <b>Enviar</b>." }
          ],
          tipLabel: { pt: "Confirmação imediata", en: "Instant confirmation", es: "Confirmación inmediata" },
          tipHtml: {
            pt: "Ao enviar com sucesso, uma notificação verde é exibida no topo confirmando o recebimento.",
            en: "Once submitted successfully, a green banner appears confirming receipt.",
            es: "Al enviar con éxito, aparece un aviso verde arriba confirmando la recepción."
          }
        }
      ]
    },
    reembolso: {
      title: { pt: "Como pedir o reembolso", en: "How to request a refund", es: "Cómo pedir el reembolso" },
      description: {
        pt: "Guia passo a passo para solicitar a devolução da taxa ambiental no Turista por Natureza.",
        en: "Step-by-step guide to request a refund of the environmental fee in Turista por Natureza.",
        es: "Guía paso a paso para solicitar la devolución de la tasa ambiental en Turista por Natureza."
      },
      lede: {
        pt: "Turista por Natureza · solicite a devolução da taxa ambiental",
        en: "Turista por Natureza · request a refund of the environmental fee",
        es: "Turista por Natureza · solicite la devolución de la tasa ambiental"
      },
      doneNarrate: {
        pt: "Guia concluído. O pedido de reembolso foi enviado. Acompanhe o status em Solicitações de reembolso, no histórico da taxa.",
        en: "Guide complete. The refund request was sent. Track the status in Refund requests, in the fee History.",
        es: "Guía completada. La solicitud de reembolso fue enviada. Siga el estado en Solicitudes de reembolso, en la Historia de la tasa."
      },
      doneLead: {
        pt: "O pedido de devolução sai da taxa ambiental e se confirma no pagamento. Acompanhe o andamento em Solicitações de reembolso, no histórico.",
        en: "The refund request starts from the environmental fee and is confirmed on the payment. Track it in Refund requests, in History.",
        es: "La solicitud de devolución sale de la tasa ambiental y se confirma en el pago. Siga el avance en Solicitudes de reembolso, en Historia."
      },
      doneTipLabel: { pt: "Lembrete", en: "Reminder", es: "Recordatorio" },
      doneTipHtml: {
        pt: "Só peça devolução de pagamento se a taxa já estiver com o status <b>Pago</b>.",
        en: "Only request a payment refund if the fee already has the status <b>Paid</b>.",
        es: "Pida la devolución de pago solo si la tasa ya está con el estado <b>Pagado</b>."
      },
      steps: [
        {
          title: { pt: "Abra Taxas e serviços", en: "Open Fees and services", es: "Abra Tasas y servicios" },
          narrate: {
            pt: "Passo 1. Abra Taxas e serviços. No grupo, toque em Taxas e serviços. Depois toque em Taxa de Conservação Ambiental de Bonito.",
            en: "Step 1. Open Fees and services. In the group, tap Fees and services. Then tap Bonito's Environmental Conservation Fee.",
            es: "Paso 1. Abra Tasas y servicios. En el grupo, toque Tasas y servicios. Luego toque Tasa de Conservación Ambiental de Bonito."
          },
          alt: {
            pt: "No grupo, o ponteiro toca em Taxas e serviços e depois na Taxa de Conservação Ambiental de Bonito.",
            en: "In the group, the pointer taps Fees and services and then Bonito's Environmental Conservation Fee.",
            es: "En el grupo, el puntero toca Tasas y servicios y luego Tasa de Conservación Ambiental de Bonito."
          },
          howto: [
            { pt: "Abra o <b>grupo</b> da viagem.", en: "Open the trip <b>group</b>.", es: "Abra el <b>grupo</b> del viaje." },
            { pt: "Toque em <b>Taxas e serviços</b>.", en: "Tap <b>Fees and services</b>.", es: "En <b>Datos del grupo</b>, toque <b>Tasas y servicios</b>." },
            { pt: "Toque em <b>Taxa de Conservação Ambiental de Bonito</b>.", en: "Tap <b>Bonito's Environmental Conservation Fee</b>.", es: "Toque <b>Tasa de Conservación Ambiental de Bonito</b>." }
          ],
          tipLabel: { pt: "Onde começar", en: "Where to start", es: "Dónde empezar" },
          tipHtml: {
            pt: "Esse botão fica no alto da tela Dados do grupo, à direita.",
            en: "This button is at the top of the Group's Data screen, on the right.",
            es: "Ese botón está arriba en Datos del grupo, a la derecha."
          }
        },
        {
          title: { pt: "Solicite a devolução", en: "Request the refund", es: "Solicite la devolución" },
          narrate: {
            pt: "Passo 2. Solicite a devolução. Confira se a taxa está com o status Pago. Toque em Solicitar devolução. Depois escolha Solicitar devolução de pagamento.",
            en: "Step 2. Request the refund. The orange Request refund button appears when Amount paid is greater than zero. If it is hidden, tap History. Then choose Request payment refund.",
            es: "Paso 2. Solicite la devolución. El botón naranja Solicitar devolución aparece cuando el Valor pagado es mayor que cero. Si no está, toque Historia. Luego elija Solicitar devolución de pago."
          },
          alt: {
            pt: "Na Taxa Ambiental, o ponteiro toca em Solicitar devolução e escolhe Solicitar devolução de pagamento.",
            en: "On Environmental Tax, Amount paid is R$ 0,00, so Request refund is hidden. The pointer taps History.",
            es: "En Impuesto Ambiental, el Valor pagado es R$ 0,00, así que Solicitar devolución está oculto. El puntero toca Historia."
          },
          howto: [
            { pt: "Confira se o status está <b>Pago</b>.", en: "Check that the status is <b>Paid</b>.", es: "Compruebe que el estado está <b>Pagado</b>." },
            { pt: "Toque em <b>Solicitar devolução</b>.", en: "If you see orange <b>Request refund</b>, tap it. If it is hidden, tap <b>History</b>.", es: "Si ve <b>Solicitar devolución</b> (naranja), tóquelo. Si no está, toque <b>Historia</b>." },
            { pt: "Escolha <b>Solicitar devolução de pagamento</b>.", en: "Choose <b>Request payment refund</b>. Do not use <b>Change in paid days or holder</b>.", es: "Elija <b>Solicitar devolución de pago</b>. No use <b>Cambio de días pagados o titular</b>." }
          ],
          tipLabel: { pt: "Dois caminhos", en: "Two paths", es: "Dos caminos" },
          tipHtml: {
            pt: "Devolução de pagamento devolve o valor pago. Devolução de diárias é outro pedido, para dias da taxa.",
            en: "The orange <b>Request refund</b> button appears when <b>Amount paid</b> is greater than zero. Request payment refund returns the amount paid. Request day refund is a different request, for fee days.",
            es: "El botón naranja <b>Solicitar devolución</b> aparece cuando el <b>Valor pagado</b> es mayor que cero. Solicitar devolución de pago devuelve el importe pagado. Solicitar devolución de diarias es otra solicitud, para días de la tasa."
          }
        },
        {
          title: { pt: "Confirme no pagamento", en: "Confirm on the payment", es: "Confirme en el pago" },
          narrate: {
            pt: "Passo 3. Confirme no pagamento. No histórico, toque no pagamento com status Pago. Na tela de detalhes, toque em Reembolso, no canto inferior esquerdo.",
            en: "Step 3. Confirm on the payment. In History, stay on the Payment tab. Tap the order with status Paid. On Details, tap Request refund, in the lower-left corner.",
            es: "Paso 3. Confirme en el pago. En Historia, quédese en la pestaña Pago. Toque el pedido con estado Pagado. En Detalles, toque Solicitar devolución, abajo a la izquierda."
          },
          alt: {
            pt: "Na tela de detalhes do pagamento, o ponteiro toca no botão vermelho Reembolso, no canto inferior esquerdo.",
            en: "On the payment details screen, the pointer taps the red Request refund button, in the lower-left corner.",
            es: "En la pantalla Detalles del pago, el puntero toca el botón rojo Solicitar devolución, abajo a la izquierda."
          },
          howto: [
            { pt: "No <b>histórico</b>, toque no pagamento com status <b>Pago</b>.", en: "In <b>History</b>, stay on the <b>Payment</b> tab. Tap the order with status <b>Paid</b>.", es: "En <b>Historia</b>, quédese en la pestaña <b>Pago</b>. Toque el pedido con estado <b>Pagado</b>." },
            { pt: "Confira o valor e o código do pedido.", en: "On <b>Details</b>, check the amount and the order code.", es: "En <b>Detalles</b>, compruebe el importe y el código del pedido." },
            { pt: "Toque em <b>Reembolso</b>, no canto inferior esquerdo.", en: "Tap red <b>Request refund</b>, in the lower-left corner.", es: "Toque <b>Solicitar devolución</b> (rojo), abajo a la izquierda." }
          ],
          tipLabel: { pt: "Depois de enviar", en: "After sending", es: "Después de enviar" },
          tipHtml: {
            pt: "O andamento aparece na aba Solicitações de reembolso, no mesmo histórico.",
            en: "Progress appears in the <b>Refund requests</b> tab, in the same History.",
            es: "El avance aparece en la pestaña <b>Solicitudes de reembolso</b>, en la misma Historia."
          }
        }
      ]
    },
    titularidade: {
      title: { pt: "Como mudar o titular da taxa ou data", en: "How to change the fee holder or date", es: "Cómo cambiar el titular de la tasa" },
      description: {
        pt: "Guia para transferir a taxa ambiental de uma pessoa para outra no grupo.",
        en: "Guide to transfer the environmental fee from one person to another in the group.",
        es: "Guía para transferir la tasa ambiental de una persona a otra en el grupo."
      },
      lede: {
        pt: "Turista por Natureza · transfira a taxa ambiental no grupo",
        en: "Turista por Natureza · transfer the environmental fee in the group",
        es: "Turista por Natureza · transfiera la tasa ambiental en el grupo"
      },
      doneNarrate: {
        pt: "Guia concluído. A mudança de titular da taxa ambiental foi solicitada. Confira no grupo se os dados ficaram certos.",
        en: "Guide complete. The environmental-fee holder change was requested. Check in the group that the details are correct.",
        es: "Guía completada. El cambio de titular de la tasa ambiental fue solicitado. Compruebe en el grupo que los datos quedaron correctos."
      },
      doneLead: {
        pt: "A titularidade da taxa se troca em Taxas e serviços, na opção de alteração de datas ou titularidade. Confira no grupo se o novo titular ficou certo.",
        en: "The fee holder is changed in Fees and services, under Change in paid days or holder. Check in the group that the new holder is correct.",
        es: "La titularidad de la tasa se cambia en Tasas y servicios, en Cambio de días pagados o titular. Compruebe en el grupo que el nuevo titular quedó correcto."
      },
      doneTipLabel: { pt: "Lembrete", en: "Reminder", es: "Recordatorio" },
      doneTipHtml: {
        pt: "A pessoa que vai receber a taxa precisa já estar no grupo, em Passageiros.",
        en: "The person who will receive the fee must already be in the group, under PASSENGERS.",
        es: "La persona que va a recibir la tasa ya debe estar en el grupo, en PASAJEROS."
      },
      steps: [
        {
          title: { pt: "Abra Taxas e serviços", en: "Open Fees and services", es: "Abra Tasas y servicios" },
          narrate: {
            pt: "Passo 1. Abra Taxas e serviços. No grupo, toque em Taxas e serviços. Depois toque em Taxa de Conservação Ambiental de Bonito.",
            en: "Step 1. Open Fees and services. In the group, tap Fees and services. Then tap Bonito's Environmental Conservation Fee.",
            es: "Paso 1. Abra Tasas y servicios. En el grupo, toque Tasas y servicios. Luego toque Tasa de Conservación Ambiental de Bonito."
          },
          alt: {
            pt: "No grupo, o ponteiro toca em Taxas e serviços e depois na Taxa de Conservação Ambiental de Bonito.",
            en: "In the group, the pointer taps Fees and services and then Bonito's Environmental Conservation Fee.",
            es: "En el grupo, el puntero toca Tasas y servicios y luego Tasa de Conservación Ambiental de Bonito."
          },
          howto: [
            { pt: "Abra o <b>grupo</b> da viagem.", en: "Open the trip <b>group</b>.", es: "Abra el <b>grupo</b> del viaje." },
            { pt: "Toque em <b>Taxas e serviços</b>.", en: "Tap <b>Fees and services</b>.", es: "En <b>Datos del grupo</b>, toque <b>Tasas y servicios</b>." },
            { pt: "Toque em <b>Taxa de Conservação Ambiental de Bonito</b>.", en: "Tap <b>Bonito's Environmental Conservation Fee</b>.", es: "Toque <b>Tasa de Conservación Ambiental de Bonito</b>." }
          ],
          tipLabel: { pt: "Onde começar", en: "Where to start", es: "Dónde empezar" },
          tipHtml: {
            pt: "O caminho é o mesmo da taxa ambiental, no alto da tela Dados do grupo.",
            en: "The path is the same as the environmental fee, at the top of the Group's Data screen.",
            es: "El camino es el mismo de la tasa ambiental, arriba en Datos del grupo."
          }
        },
        {
          title: { pt: "Altere datas ou titularidade", en: "Change dates or ownership", es: "Cambie fechas o titularidad" },
          narrate: {
            pt: "Passo 2. Altere datas ou titularidade. Na taxa ambiental, toque em Alteração de datas ou titularidade. Não use Solicitar devolução neste fluxo.",
            en: "Step 2. Change dates or ownership. On the environmental fee, tap Change in paid days or holder. That green button appears only when Amount paid is greater than zero. Do not use Request refund in this flow.",
            es: "Paso 2. Cambie fechas o titularidad. En la tasa ambiental, toque Cambio de días pagados o titular. Ese botón verde aparece solo cuando el Valor pagado es mayor que cero. No use Solicitar devolución en este flujo."
          },
          alt: {
            pt: "Na Taxa Ambiental, o ponteiro toca no botão verde Alteração de datas ou titularidade.",
            en: "On Environmental Tax, the pointer taps the green Change in paid days or holder button.",
            es: "En Impuesto Ambiental, el puntero toca el botón verde Cambio de días pagados o titular."
          },
          howto: [
            { pt: "Na taxa ambiental, toque em <b>Alteração de datas ou titularidade</b>.", en: "On the environmental fee, tap <b>Change in paid days or holder</b>.", es: "En la tasa ambiental, toque <b>Cambio de días pagados o titular</b>." },
            { pt: "Não use <b>Solicitar devolução</b> neste fluxo.", en: "Do not use <b>Request refund</b> in this flow.", es: "No use <b>Solicitar devolución</b> en este flujo." }
          ],
          tipLabel: { pt: "Atenção", en: "Attention", es: "Atención" },
          tipHtml: {
            pt: "O botão laranja pede reembolso. O verde, logo abaixo, é o da mudança de titular ou de datas.",
            en: "The orange button requests a refund. The green <b>Change in paid days or holder</b> appears only when <b>Amount paid</b> is greater than zero. In this recording it is R$ 0,00, so the button is hidden.",
            es: "El botón naranja pide reembolso. El verde <b>Cambio de días pagados o titular</b> aparece solo cuando el <b>Valor pagado</b> es mayor que cero. En esta grabación es R$ 0,00, así que el botón está oculto."
          }
        },
        {
          title: { pt: "Escolha mudança de titular", en: "Choose holder change", es: "Elija cambio de titular" },
          narrate: {
            pt: "Passo 3. Escolha mudança de titular. Em Tipo de mudança, selecione Mudança de Titular da Taxa. Depois toque em Prosseguir.",
            en: "Step 3. Choose holder change. In the type of change list, select Fee Holder Change. Then tap Next.",
            es: "Paso 3. Elija cambio de titular. En el tipo de cambio, seleccione Cambio de Titular de la Tasa. Luego toque Continuar."
          },
          alt: {
            pt: "No campo Tipo de mudança, o ponteiro escolhe Mudança de Titular da Taxa e toca em Prosseguir.",
            en: "The recording stays on Environmental Tax because Amount paid is R$ 0,00. When days are paid, choose Fee Holder Change and tap Next.",
            es: "La grabación se queda en Impuesto Ambiental porque el Valor pagado es R$ 0,00. Cuando hay días pagados, elija Cambio de Titular de la Tasa y toque Continuar."
          },
          howto: [
            { pt: "Em <b>Tipo de mudança</b>, toque na lista.", en: "In the type of change list, tap the list.", es: "En el tipo de cambio, toque la lista." },
            { pt: "Selecione <b>Mudança de Titular da Taxa</b>.", en: "Select <b>Fee Holder Change</b>.", es: "Seleccione <b>Cambio de Titular de la Tasa</b>." },
            { pt: "Toque em <b>Prosseguir</b>.", en: "Tap <b>Next</b>.", es: "Toque <b>Continuar</b>." }
          ],
          tipLabel: { pt: "Não confunda", en: "Do not mix them up", es: "No los confunda" },
          tipHtml: {
            pt: "Mudança de Dia altera as datas. Para trocar a pessoa da taxa, use Mudança de Titular da Taxa.",
            en: "Change of Day changes the dates. To change the person on the fee, use Fee Holder Change.",
            es: "<b>Cambio de Día</b> cambia las fechas. Para cambiar a la persona de la tasa, use <b>Cambio de Titular de la Tasa</b>."
          }
        },
        {
          title: { pt: "Indique de quem para quem", en: "Choose from and to", es: "Indique de quién a quién" },
          narrate: {
            pt: "Passo 4. Indique de quem para quem. Em De, escolha quem deixa de ser o titular. Em Para, escolha o novo titular da taxa.",
            en: "Step 4. Choose from and to. In From, choose who stops being the holder. In To, choose the new fee holder.",
            es: "Paso 4. Indique de quién a quién. En De, elija quién deja de ser el titular. En A, elija el nuevo titular de la tasa."
          },
          alt: {
            pt: "Nas listas De e Para, o ponteiro escolhe o titular atual e o novo titular da taxa.",
            en: "The recording stays on Environmental Tax. When Amount paid is greater than zero, choose who stops being the holder in From, and the new holder in To.",
            es: "La grabación se queda en Impuesto Ambiental. Cuando el Valor pagado es mayor que cero, elija quién deja de ser el titular en De, y el nuevo titular en A."
          },
          howto: [
            { pt: "Em <b>De</b>, escolha quem deixa de ser o titular.", en: "In <b>From</b>, choose who stops being the holder.", es: "En <b>De</b>, elija quién deja de ser el titular." },
            { pt: "Em <b>Para</b>, escolha o <b>novo titular</b> da taxa.", en: "In <b>To</b>, choose the <b>new holder</b> of the fee.", es: "En <b>A</b>, elija el <b>nuevo titular</b> de la tasa." }
          ],
          tipLabel: { pt: "Antes de seguir", en: "Before you continue", es: "Antes de seguir" },
          tipHtml: {
            pt: "Cadastre a outra pessoa em Passageiros se ela ainda não estiver no grupo.",
            en: "Register the other person under <b>PASSENGERS</b> if they are not already in the group.",
            es: "Registre a la otra persona en <b>PASAJEROS</b> si aún no está en el grupo."
          }
        }
      ]
    },
    isencao: {
      title: { pt: "Como pedir isenção da taxa (moradores de Bonito)", en: "How to request a fee exemption (Bonito residents)", es: "Cómo pedir la exención de la tasa (residentes de Bonito)" },
      description: {
        pt: "Guia para o morador de Bonito solicitar isenção da taxa ambiental no Turista por Natureza.",
        en: "Guide for a Bonito resident to request an environmental-fee exemption in Turista por Natureza.",
        es: "Guía para que el residente de Bonito solicite la exención de la tasa ambiental en Turista por Natureza."
      },
      lede: {
        pt: "Turista por Natureza · isenção para residente de Bonito/MS",
        en: "Turista por Natureza · exemption for Bonito/MS residents",
        es: "Turista por Natureza · exención para residentes de Bonito/MS"
      },
      doneNarrate: {
        pt: "Guia concluído. Depois de anexar documento e comprovante de residência, volte em Solicitações e toque de novo em Solicitar isenção. A aprovação depende do horário da prefeitura.",
        en: "Guide complete. After attaching ID and proof of residence, go back to Requests and tap Request Tax Exemption for Bonito/MS residents again. Approval depends on the city hall schedule.",
        es: "Guía completada. Después de adjuntar documento y comprobante de residencia, vuelva a Solicitações y toque de nuevo Solicitar isenção. La aprobación depende del horario de la prefectura."
      },
      doneLead: {
        pt: "A isenção é para residente de Bonito/MS, com o aparelho no Mato Grosso do Sul. Sem documento pessoal e comprovante de residência o pedido não segue.",
        en: "The exemption is for Bonito/MS residents, with the device in Mato Grosso do Sul. Without personal ID and proof of residence the request does not continue.",
        es: "La exención es para residentes de Bonito/MS, con el aparato en Mato Grosso do Sul. Sin documento personal y comprobante de residencia la solicitud no sigue."
      },
      doneTipLabel: { pt: "Lembrete", en: "Reminder", es: "Recordatorio" },
      doneTipHtml: {
        pt: "O menu de três pontinhos do grupo <b>não</b> lista Solicitações. O caminho é Passageiros, Detalhes, Solicitações.",
        en: "The group’s three-dot menu does <b>not</b> list Requests. The path is Passengers, Details, Requests.",
        es: "El menú de tres puntos del grupo <b>no</b> lista Solicitações. El camino es Passageiros, Detalhes, Solicitações."
      },
      steps: [
        {
          title: { pt: "Abra Passageiros", en: "Open Passengers", es: "Abra Passageiros" },
          narrate: {
            pt: "Passo 1. Abra Passageiros. Entre no grupo e, na barra de baixo, toque em Passageiros.",
            en: "Step 1. Open Passengers. Go into the group and, on the bottom bar, tap Passengers.",
            es: "Paso 1. Abra Passageiros. Entre en el grupo y, en la barra de abajo, toque Passageiros."
          },
          alt: {
            pt: "No grupo, o ponteiro toca na aba Passageiros, na barra inferior.",
            en: "In the group, the pointer taps the Passengers tab on the bottom bar.",
            es: "En el grupo, el puntero toca la pestaña Passageiros, en la barra inferior."
          },
          howto: [
            { pt: "Entre no <b>grupo</b>.", en: "Go into the <b>group</b>.", es: "Entre en el <b>grupo</b>." },
            { pt: "Na barra inferior, toque em <b>Passageiros</b>.", en: "On the bottom bar, tap <b>Passengers</b>.", es: "En la barra inferior, toque <b>Passageiros</b>." }
          ],
          tipLabel: { pt: "Quem pode pedir", en: "Who can request it", es: "Quién puede pedirla" },
          tipHtml: {
            pt: "A isenção é para <b>residente de Bonito/MS</b>. O aparelho precisa estar no Mato Grosso do Sul.",
            en: "The exemption is for a <b>Bonito/MS resident</b>. The device must be in Mato Grosso do Sul.",
            es: "La exención es para <b>residente de Bonito/MS</b>. El aparato debe estar en Mato Grosso do Sul."
          }
        },
        {
          title: { pt: "Abra Solicitações", en: "Open Requests", es: "Abra Solicitações" },
          narrate: {
            pt: "Passo 2. Abra Solicitações. No passageiro, toque em Detalhes. No alto do cadastro, toque em Solicitações.",
            en: "Step 2. Open Requests. On the passenger, tap Details. At the top of the registration, tap Requests.",
            es: "Paso 2. Abra Solicitações. En el pasajero, toque Detalhes. En la parte alta del cadastro, toque Solicitações."
          },
          alt: {
            pt: "No cadastro do passageiro, o ponteiro toca no botão Solicitações, no alto à direita.",
            en: "On the passenger registration, the pointer taps the Requests button, at the top right.",
            es: "En el cadastro del pasajero, el puntero toca el botón Solicitações, arriba a la derecha."
          },
          howto: [
            { pt: "No passageiro, toque em <b>Detalhes</b>.", en: "On the passenger, tap <b>Details</b>.", es: "En el pasajero, toque <b>Detalhes</b>." },
            { pt: "No alto do cadastro, toque em <b>Solicitações</b>.", en: "At the top of the registration, tap <b>Requests</b>.", es: "En la parte alta del cadastro, toque <b>Solicitações</b>." }
          ],
          tipLabel: { pt: "Caminho certo", en: "The right path", es: "Camino correcto" },
          tipHtml: {
            pt: "Solicitações não aparece no menu de três pontinhos do grupo.",
            en: "Requests does not appear in the group’s three-dot menu.",
            es: "Solicitações no aparece en el menú de tres puntos del grupo."
          }
        },
        {
          title: { pt: "Solicite a isenção", en: "Request the exemption", es: "Solicite la exención" },
          narrate: {
            pt: "Passo 3. Solicite a isenção. Toque em Solicitar isenção de taxa para residentes de Bonito, Mato Grosso do Sul. Confirme o alerta: é preciso documento pessoal e comprovante de residência.",
            en: "Step 3. Request the exemption. Tap Request Tax Exemption for Bonito/MS residents. Confirm the alert: you need personal ID and proof of residence.",
            es: "Paso 3. Solicite la exención. Toque Solicitar Insenção de Taxa para Residentes de Bonito/MS. Confirme la alerta: se necesita documento personal y comprobante de residencia."
          },
          alt: {
            pt: "Na lista Solicitações, o ponteiro toca em Solicitar isenção e confirma o alerta de documentos.",
            en: "In the Requests list, the pointer taps Request Tax Exemption for Bonito/MS residents and confirms the document alert.",
            es: "En la lista Solicitações, el puntero toca Solicitar isenção y confirma la alerta de documentos."
          },
          howto: [
            { pt: "Toque em <b>Solicitar Insenção de Taxa para Residentes de Bonito/MS</b> — é o texto da tela.", en: "Tap <b>Request Tax Exemption for Bonito/MS residents</b> — that is the on-screen wording.", es: "Toque <b>Solicitar Insenção de Taxa para Residentes de Bonito/MS</b> — es el texto de la pantalla." },
            { pt: "Se o app pedir localização, toque em <b>Permitir</b>. A opção só aparece no <b>MS</b>.", en: "If the app asks for location, tap <b>Allow Location</b>. The option only appears in <b>MS</b>.", es: "Si la aplicación pide ubicación, toque <b>Permitir</b>. La opción solo aparece en <b>MS</b>." },
            { pt: "Confirme o alerta: documento de identificação e comprovante de residência. Toque em <b>OK</b>.", en: "Confirm the alert: identification document and proof of residence. Tap <b>OK</b>.", es: "Confirme la alerta: documento de identificación y comprobante de residencia. Toque <b>OK</b>." }
          ],
          tipLabel: { pt: "Atenção", en: "Attention", es: "Atención" },
          tipHtml: {
            pt: "Sem esses dois arquivos o pedido não segue. Quem já teve pedido negado pode ver a opção desabilitada.",
            en: "Without those two files the request does not continue. Anyone who already had a denied request may see the option disabled.",
            es: "Sin esos dos archivos la solicitud no sigue. Quien ya tuvo una solicitud denegada puede ver la opción deshabilitada."
          }
        },
        {
          title: { pt: "Anexe os documentos", en: "Attach the documents", es: "Adjunte los documentos" },
          narrate: {
            pt: "Passo 4. Anexe os documentos. Na tela Documentos, toque no mais. Envie o documento pessoal e o comprovante de residência. Depois volte em Solicitações e toque de novo em solicitar isenção.",
            en: "Step 4. Attach the documents. On the Documents screen, tap plus. Send the personal ID and the proof of residence. Then go back to Requests and tap Request Tax Exemption for Bonito/MS residents again.",
            es: "Paso 4. Adjunte los documentos. En la pantalla Documentos, toque el más. Envíe el documento personal y el comprobante de residencia. Luego vuelva a Solicitações y toque de nuevo solicitar isenção."
          },
          alt: {
            pt: "Na tela Documentos, o menu mais mostra Comprovante residência, Documento pessoal e Selfie.",
            en: "On the Documents screen, the plus menu shows proof of residence, personal ID, and Selfie.",
            es: "En la pantalla Documentos, el menú más muestra Comprovante residência, Documento pessoal y Selfie."
          },
          howto: [
            { pt: "Na tela <b>Documentos</b>, toque no botão <b>+</b>.", en: "On the <b>Documents</b> screen, tap the <b>+</b> button.", es: "En la pantalla <b>Documentos</b>, toque el botón <b>+</b>." },
            { pt: "Envie o <b>documento pessoal</b> (CPF, RG ou passaporte) e o <b>comprovante de residência</b>.", en: "Send the <b>personal ID</b> (CPF, RG, or passport) and the <b>proof of residence</b>.", es: "Envíe el <b>documento personal</b> (CPF, RG o pasaporte) y el <b>comprobante de residencia</b>." },
            { pt: "Volte em <b>Solicitações</b> e toque de novo em solicitar isenção.", en: "Go back to <b>Requests</b> and tap Request Tax Exemption for Bonito/MS residents again.", es: "Vuelva a <b>Solicitações</b> y toque de nuevo solicitar isenção." }
          ],
          tipLabel: { pt: "Depois de enviar", en: "After sending", es: "Después de enviar" },
          tipHtml: {
            pt: "Se der certo, a isenção fica solicitada. A aprovação depende do horário da prefeitura.",
            en: "If it works, the exemption is requested. Approval depends on the city hall schedule.",
            es: "Si funciona, la exención queda solicitada. La aprobación depende del horario de la prefectura."
          }
        }
      ]
    },
    importar: {
      title: { pt: "Como importar integrantes", en: "How to import passengers", es: "Cómo importar pasajeros" },
      description: {
        pt: "Guia para trazer ao grupo alguém que já tem cadastro no Turista por Natureza, pelo QR Code ou pelo documento.",
        en: "Guide to bring into the group someone who already has a Turista por Natureza registration, by QR Code or document number.",
        es: "Guía para traer al grupo a alguien que ya tiene cuenta en Turista por Natureza, por código QR o por número de documento."
      },
      lede: {
        pt: "Turista por Natureza · importe quem já tem cadastro",
        en: "Turista por Natureza · import someone who already has an account",
        es: "Turista por Natureza · importe a quien ya tiene cuenta"
      },
      doneNarrate: {
        pt: "Guia concluído. Dá para importar pelo QR Code ou pelo número do documento. Confira os dados e toque em Salvar passageiro. Se a pessoa já estiver neste grupo, o app avisa e não importa de novo.",
        en: "Guide complete. You can import by QR Code or by document number. Check the details and tap Save passenger. If the person is already in this group, the app warns you and does not import again.",
        es: "Guía completada. Se puede importar por código QR o por número de documento. Revise los datos y toque Guardar pasajero. Si la persona ya está en este grupo, la aplicación avisa y no importa de nuevo."
      },
      doneLead: {
        pt: "Há dois jeitos de trazer alguém que já tem cadastro: ler o QR Code ou informar o documento e confirmar a importação.",
        en: "There are two ways to bring in someone who already has an account: read the QR Code, or enter the document and confirm the import.",
        es: "Hay dos formas de traer a alguien que ya tiene cuenta: escanear el código QR o informar el documento y confirmar la importación."
      },
      doneTipLabel: { pt: "Outro caminho", en: "Another path", es: "Otro camino" },
      doneTipHtml: {
        pt: "Pelo documento: preencha o número, saia do campo, confirme o primeiro nome e toque em Sim. Dependente sem documento não entra por esse caminho.",
        en: "By document: fill in the number, leave the field, confirm the first name, and tap Yes. A dependent without a document cannot use this path.",
        es: "Por documento: complete el número, salga del campo, confirme el Primer nombre y toque Sí. Un dependiente sin documento no entra por este camino."
      },
      steps: [
        {
          title: { pt: "Abra Passageiros", en: "Open PASSENGERS", es: "Abra PASAJEROS" },
          narrate: {
            pt: "Passo 1. Abra Passageiros. Entre no grupo e, na barra de baixo, toque em Passageiros.",
            en: "Step 1. Open PASSENGERS. Go into the group and, on the bottom bar, tap PASSENGERS.",
            es: "Paso 1. Abra PASAJEROS. Entre en el grupo y, en la barra de abajo, toque PASAJEROS."
          },
          alt: {
            pt: "No grupo, o ponteiro toca na aba Passageiros, na barra inferior.",
            en: "In the group, the pointer taps the PASSENGERS tab on the bottom bar.",
            es: "En el grupo, el puntero toca la pestaña PASAJEROS, en la barra inferior."
          },
          howto: [
            { pt: "Entre no <b>grupo</b>.", en: "Go into the <b>group</b>.", es: "Abra el <b>grupo</b> del viaje." },
            { pt: "Na barra inferior, toque em <b>Passageiros</b>.", en: "On the bottom bar, tap <b>PASSENGERS</b>.", es: "En la barra inferior, toque <b>PASAJEROS</b>." }
          ],
          tipLabel: { pt: "Para quem é", en: "Who this is for", es: "Para quién es" },
          tipHtml: {
            pt: "Use este fluxo para trazer alguém que <b>já tem cadastro</b> no Turista por Natureza.",
            en: "Use this flow to bring in someone who <b>already has an account</b> in Turista por Natureza.",
            es: "Use este flujo para traer a alguien que <b>ya tiene cuenta</b> en Turista por Natureza."
          }
        },
        {
          title: { pt: "Abra Cadastro Passageiro", en: "Open Passenger's Profile", es: "Abra Perfil del pasajero" },
          narrate: {
            pt: "Passo 2. Abra Cadastro Passageiro. Toque no botão mais, no canto inferior direito. No formulário, o documento é o campo usado para importar pelo número.",
            en: "Step 2. Open Passenger's Profile. Tap the plus button, in the lower-right corner. On the form, Document number is the field used to import by number.",
            es: "Paso 2. Abra Perfil del pasajero. Toque el botón más, en la esquina inferior derecha. En el formulario, Núm. de documento es el campo usado para importar por número."
          },
          alt: {
            pt: "No Cadastro Passageiro, o ponteiro indica o campo número do documento, com o tipo CPF.",
            en: "On Passenger's Profile, the pointer highlights the document-number field, with type CPF.",
            es: "En Perfil del Pasajero, el puntero indica el campo Núm. de documento, con el tipo DNI."
          },
          howto: [
            { pt: "Toque no botão <b>+</b>, no canto inferior direito.", en: "Tap the <b>+</b> button, in the lower-right corner.", es: "Toque el botón <b>+</b>, en la esquina inferior derecha." },
            { pt: "Abre a tela <b>Cadastro Passageiro</b>.", en: "The <b>Passenger's Profile</b> screen opens.", es: "Se abre la pantalla <b>Perfil del pasajero</b>." },
            { pt: "Para importar pelo documento: escolha o tipo, preencha <b>Num. Documento</b> e toque fora do campo.", en: "To import by document: choose the type, fill in <b>Document number</b>, and tap outside the field.", es: "Para importar por documento: elija el tipo, complete <b>Núm. de documento</b> y toque fuera del campo." }
          ],
          tipLabel: { pt: "Se o cadastro já existir", en: "If the registration already exists", es: "Si el registro ya existe" },
          tipHtml: {
            pt: "O app pergunta se quer importar os dados. Informe o <b>primeiro nome</b> e toque em <b>Sim</b>. Depois confira e salve.",
            en: "The app asks <b>Do you want to import their data?</b> Enter the <b>First name</b> and tap <b>Yes</b>. Then check and tap <b>Save passenger</b>.",
            es: "La aplicación pregunta <b>¿Quiere importar los datos?</b> Informe el <b>Primer nombre</b> y toque <b>Sí</b>. Luego revise y toque <b>Guardar pasajero</b>."
          }
        },
        {
          title: { pt: "Importe com QR Code", en: "Import with QR Code", es: "Importe con código QR" },
          narrate: {
            pt: "Passo 3. Importe com QR Code. No topo, toque no ícone de QR Code. Autorize a câmera, se o celular pedir. Aponte para o QR da outra pessoa, no menu de três pontinhos do cadastro dela, ou na carteirinha. Confira os dados e toque em Salvar passageiro.",
            en: "Step 3. Import with QR Code. At the top, tap the QR Code icon. Allow the camera if the phone asks. Point at the other person’s QR, in the three-dot menu of their registration, or on the card. Check the details and tap Save passenger.",
            es: "Paso 3. Importe con código QR. Arriba, toque el icono de código QR. Permita la cámara si el teléfono lo pide. Apunte al QR de la otra persona, en el menú de tres puntos de su registro, o en su tarjeta. Revise los datos y toque Guardar pasajero."
          },
          alt: {
            pt: "Na tela Importar com QR Code, o ponteiro aponta o ícone de QR no alto à direita.",
            en: "On the Import with QR Code screen, the pointer highlights the QR icon at the top right.",
            es: "En la pantalla Importar con Código QR, el puntero apunta el icono de QR arriba a la derecha."
          },
          howto: [
            { pt: "No topo, toque no ícone de <b>QR Code</b> (Importar com QR Code).", en: "At the top, tap the <b>QR Code</b> icon (Import with QR Code).", es: "Arriba, toque el icono de <b>código QR</b> (<b>Importar con Código QR</b>)." },
            { pt: "Autorize a câmera, se o celular pedir.", en: "Allow the camera if the phone asks.", es: "Permita la cámara si el teléfono lo pide." },
            { pt: "Aponte para o QR da outra pessoa. Confira os dados e toque em <b>Salvar passageiro</b>.", en: "Point at the other person’s QR. Check the details and tap <b>Save passenger</b>.", es: "Apunte al QR de la otra persona. Revise los datos y toque <b>Guardar pasajero</b>." }
          ],
          tipLabel: { pt: "Onde está o QR", en: "Where the QR is", es: "Dónde está el QR" },
          tipHtml: {
            pt: "No cadastro da pessoa: menu de três pontinhos e depois <b>QR Code</b>. Também vale a carteirinha.",
            en: "On the person’s registration: three-dot menu, then <b>QR Code</b>. The card also works.",
            es: "En el registro de la persona: menú de tres puntos y luego <b>Código QR</b>. También vale la tarjeta."
          }
        }
      ]
    },
    comprovante: {
      title: { pt: "Como imprimir o comprovante", en: "How to print the receipt", es: "Cómo imprimir el comprobante" },
      description: {
        pt: "Guia para imprimir o comprovante oficial da taxa ambiental paga no Turista por Natureza.",
        en: "Guide to print the official receipt of the environmental fee paid in Turista por Natureza.",
        es: "Guía para imprimir el comprobante oficial de la tasa ambiental pagada en Turista por Natureza."
      },
      lede: {
        pt: "Turista por Natureza · comprovante da taxa ambiental",
        en: "Turista por Natureza · environmental-fee receipt",
        es: "Turista por Natureza · comprobante de la tasa ambiental"
      },
      doneNarrate: {
        pt: "Guia concluído. Só o pedido pago gera o comprovante oficial. Confira código, localizador, valor, nome e o status pago. Depois toque em Imprimir, ou salve como PDF.",
        en: "Guide complete. Only a paid order generates the official receipt. Check the code, booking code, amount, name, and the Paid status. Then tap Print, or save as PDF.",
        es: "Guía completada. Solo el pedido Pagado genera el comprobante oficial. Revise el código, el localizador, el valor, el nombre y el estado Pagado. Luego toque Imprimir, o guarde como PDF."
      },
      doneLead: {
        pt: "O comprovante oficial da Taxa de Conservação Ambiental sai só de pedido com status Pago. Confira os dados antes de imprimir.",
        en: "The official environmental conservation fee receipt comes only from an order with status Paid. Check the details before printing.",
        es: "El comprobante oficial de la Tasa de Conservación Ambiental sale solo de un pedido con estado Pagado. Revise los datos antes de imprimir."
      },
      doneTipLabel: { pt: "Outros caminhos", en: "Other paths", es: "Otros caminos" },
      doneTipHtml: {
        pt: "Também dá para abrir em <b>Meus pedidos</b>, logo depois de pagar, ou em Consultar Recibo no site, com o código CT e o localizador do grupo.",
        en: "You can also open it in <b>My orders</b>, right after paying, or look up the receipt on the website with the CT code and the group booking code.",
        es: "También se puede abrir en <b>Mis pedidos</b>, justo después de pagar, o consultar el recibo en el sitio, con el código CT y el localizador del grupo."
      },
      steps: [
        {
          title: { pt: "Abra a taxa ambiental", en: "Open the environmental fee", es: "Abra Impuesto Ambiental" },
          narrate: {
            pt: "Passo 1. Abra a taxa ambiental. No grupo, toque em Taxas e serviços. Depois toque em Taxa de Conservação Ambiental de Bonito.",
            en: "Step 1. Open the environmental fee. On Group's Data, tap Fees and services. Then tap Bonito's Environmental Conservation Fee.",
            es: "Paso 1. Abra Impuesto Ambiental. En Datos del grupo, toque Tasas y servicios. Luego toque Tasa de Conservación Ambiental de Bonito."
          },
          alt: {
            pt: "No grupo, o ponteiro toca em Taxas e serviços e na Taxa de Conservação Ambiental de Bonito.",
            en: "In the group, the pointer taps Fees and services and Bonito's Environmental Conservation Fee.",
            es: "En el grupo, el puntero toca Tasas y servicios y Tasa de Conservación Ambiental de Bonito."
          },
          howto: [
            { pt: "Entre no <b>grupo</b>.", en: "Go into the <b>group</b>.", es: "Abra el <b>grupo</b> del viaje." },
            { pt: "Toque em <b>Taxas e serviços</b>.", en: "On <b>Group's Data</b>, tap <b>Fees and services</b>.", es: "En <b>Datos del grupo</b>, toque <b>Tasas y servicios</b>." },
            { pt: "Toque em <b>Taxa de Conservação Ambiental de Bonito</b>.", en: "Tap <b>Bonito's Environmental Conservation Fee</b>.", es: "Toque <b>Tasa de Conservación Ambiental de Bonito</b>." }
          ],
          tipLabel: { pt: "Antes de imprimir", en: "Before printing", es: "Antes de imprimir" },
          tipHtml: {
            pt: "Só pedido <b>Pago</b> gera o comprovante oficial da prefeitura.",
            en: "Only an order with status <b>Paid</b> generates the official city-hall receipt.",
            es: "Solo un pedido con estado <b>Pagado</b> genera el comprobante oficial de la prefectura."
          }
        },
        {
          title: { pt: "Abra o histórico", en: "Open the history", es: "Abra Historia" },
          narrate: {
            pt: "Passo 2. Abra o histórico. No alto da taxa ambiental, toque em Histórico. Depois toque no pedido com código CT e status Pago.",
            en: "Step 2. Open History. At the top of Environmental Tax, tap History. Stay on the Payment tab. Then tap the order with a CT code. Prefer status Paid.",
            es: "Paso 2. Abra Historia. Arriba, en Impuesto Ambiental, toque Historia. Quédese en la pestaña Pago. Luego toque el pedido con código CT. Prefiera el estado Pagado."
          },
          alt: {
            pt: "Na tela Histórico, o pedido CT119767 aparece com status Pago, no modo crédito.",
            en: "On the History screen, the Payment tab lists CT orders. Prefer status Paid. This recording may show Pending Pix orders.",
            es: "En la pantalla Historia, la pestaña Pago lista pedidos CT. Prefiera el estado Pagado. Esta grabación puede mostrar pedidos Pix Pendiente."
          },
          howto: [
            { pt: "Toque em <b>Histórico</b>, no alto da taxa ambiental.", en: "Tap <b>History</b> (money-bag icon) at the top of Environmental Tax.", es: "Toque <b>Historia</b> (icono de bolsa), arriba en Impuesto Ambiental." },
            { pt: "Toque no pedido com código <b>CT</b> e status <b>Pago</b>.", en: "Stay on the <b>Payment</b> tab. Tap the order with a <b>CT</b> code. Prefer status <b>Paid</b>.", es: "Quédese en la pestaña <b>Pago</b>. Toque el pedido con código <b>CT</b>. Prefiera el estado <b>Pagado</b>." }
          ],
          tipLabel: { pt: "Se o Histórico não aparecer", en: "If History does not appear", es: "Si Historia no aparece" },
          tipHtml: {
            pt: "Dá para chegar na lista por Solicitar devolução e depois Solicitar devolução de pagamento.",
            en: "You can reach the list through Request refund and then Request payment refund.",
            es: "Se puede llegar a la lista por <b>Solicitar devolución</b> y luego <b>Solicitar devolución de pago</b>."
          }
        },
        {
          title: { pt: "Toque em Imprimir comprovante", en: "Tap Print Receipt", es: "Toque Imprimir Comprobante" },
          narrate: {
            pt: "Passo 3. Toque em Imprimir comprovante. Na tela de detalhes do pagamento, toque em Imprimir comprovante, no canto inferior direito.",
            en: "Step 3. Tap Print Receipt. On Details, tap Print Receipt, in the lower-right corner.",
            es: "Paso 3. Toque Imprimir Comprobante. En Detalles, toque Imprimir Comprobante, en la esquina inferior derecha."
          },
          alt: {
            pt: "Nos detalhes do pagamento pago, o ponteiro toca em Imprimir Comprovante, no canto inferior direito.",
            en: "On the paid payment details, the pointer taps Print Receipt, in the lower-right corner.",
            es: "En Detalles, el puntero toca Imprimir Comprobante, en la esquina inferior derecha."
          },
          howto: [
            { pt: "Confira se o status está <b>Pago</b>.", en: "On <b>Details</b>, check that the status is <b>Paid</b>.", es: "En <b>Detalles</b>, compruebe que el estado está <b>Pagado</b>." },
            { pt: "Toque em <b>Imprimir Comprovante</b>, no canto inferior direito.", en: "Tap <b>Print Receipt</b>, in the lower-right corner.", es: "Toque <b>Imprimir Comprobante</b>, en la esquina inferior derecha." }
          ],
          tipLabel: { pt: "Não confunda", en: "Do not mix them up", es: "No los confunda" },
          tipHtml: {
            pt: "O botão vermelho à esquerda é <b>Reembolso</b>. O comprovante é o verde, à direita.",
            en: "The red button on the left is <b>Request refund</b>. The receipt is the green one on the right.",
            es: "El botón rojo a la izquierda es <b>Solicitar devolución</b>. El comprobante es el verde, a la derecha. Esta grabación puede mostrar <b>Pendiente</b>; el comprobante oficial sale de <b>Pagado</b>."
          }
        },
        {
          title: { pt: "Imprima o recibo", en: "Print the receipt", es: "Imprima el comprobante" },
          narrate: {
            pt: "Passo 4. Imprima o recibo. Confira código do pedido, localizador, valor, nome e o status pago. Toque em Imprimir e use a impressora ou salvar como PDF.",
            en: "Step 4. Print the receipt. Check the order code, booking code, amount, name, and the Paid status. Tap Print and use the printer, or save as PDF.",
            es: "Paso 4. Imprima el comprobante. Revise el código del pedido, el localizador, el valor, el nombre y el estado Pagado. Toque Imprimir y use la impresora, o guarde como PDF."
          },
          alt: {
            pt: "No recibo da taxa ambiental, o ponteiro toca no botão Imprimir, com o status pago.",
            en: "On the environmental-fee receipt, the pointer taps the Print button, with status Paid.",
            es: "En el comprobante de Impuesto Ambiental, el puntero toca el botón Imprimir, con el estado Pagado."
          },
          howto: [
            { pt: "Confira código do pedido, localizador, valor, nome e status <b>pago</b>.", en: "Check the order code, booking code, amount, name, and status <b>Paid</b>.", es: "Revise el código del pedido, el localizador, el valor, el nombre y el estado <b>Pagado</b>." },
            { pt: "Toque em <b>Imprimir</b>.", en: "Tap <b>Print</b>.", es: "Toque <b>Imprimir</b>." },
            { pt: "Use a impressora ou <b>Salvar como PDF</b> do navegador.", en: "Use the printer or the browser’s <b>Save as PDF</b>.", es: "Use la impresora o <b>Guardar como PDF</b> del navegador." }
          ],
          tipLabel: { pt: "Se não estiver pago", en: "If it is not paid", es: "Si no está Pagado" },
          tipHtml: {
            pt: "O botão pode aparecer, mas abre um recibo interno do app, não o comprovante oficial da prefeitura.",
            en: "The button may still appear, but it opens an in-app receipt, not the official city-hall document.",
            es: "El botón puede aparecer, pero abre un recibo interno de la aplicación, no el comprobante oficial de la prefectura."
          }
        }
      ]
    }
  };

  function detectLang() {
    const nav = String(navigator.language || "pt").slice(0, 2).toLowerCase();
    if (nav === "en" || nav === "es") return nav;
    return "pt";
  }

  function getLang() {
    const params = new URLSearchParams(location.search);
    const q = params.get("lang");
    if (LANGS.indexOf(q) >= 0) {
      localStorage.setItem(KEY, q);
      return q;
    }
    const saved = localStorage.getItem(KEY);
    if (LANGS.indexOf(saved) >= 0) return saved;
    return detectLang();
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) < 0) lang = "pt";
    localStorage.setItem(KEY, lang);
    return lang;
  }

  function t(key) {
    const lang = getLang();
    const args = Array.prototype.slice.call(arguments, 1);
    const id = document.documentElement.getAttribute("data-guide");
    const g = id && GUIDES[id];
    if (g && g[key] && g[key][lang] != null) {
      const gv = g[key][lang];
      return typeof gv === "function" ? gv.apply(null, args) : gv;
    }
    const ui = UI[lang] || UI.pt;
    const val = ui[key];
    if (typeof val === "function") return val.apply(null, args);
    if (val != null) return val;
    return "";
  }

  function voiceSrc(ptSrc, lang) {
    if (!ptSrc) return ptSrc;
    const base = String(ptSrc).replace(/\.(en|es)\.mp3$/i, ".mp3");
    if (lang === "pt") return base;
    return base.replace(/\.mp3$/i, "." + lang + ".mp3");
  }

  function mediaSrc(ptSrc, lang) {
    if (!ptSrc) return ptSrc;
    const base = String(ptSrc).replace(/\.(en|es)\.(mp4|jpg)$/i, ".$2");
    if (lang === "pt") return base;
    return base.replace(/\.(mp4|jpg)$/i, "." + lang + ".$1");
  }

  function applyLocalizedMedia(el, lang) {
    if (!el) return;
    let pt = el.getAttribute("data-src-pt");
    if (!pt) {
      pt = el.getAttribute("src") || "";
      if (pt) el.setAttribute("data-src-pt", pt.replace(/\.(en|es)\.(mp4|jpg)$/i, ".$2"));
      pt = el.getAttribute("data-src-pt") || pt;
    }
    if (!pt) return;
    el.dataset.ptFallback = "";
    const next = mediaSrc(pt, lang);
    if (el.getAttribute("src") !== next) {
      el.setAttribute("src", next);
      if (el.tagName === "VIDEO") {
        try { el.load(); } catch (err) {}
      }
    }
    if (el.tagName === "VIDEO") {
      let still = el.getAttribute("data-still-pt");
      if (!still) {
        still = el.getAttribute("data-still") || el.getAttribute("poster") || "";
        if (still) el.setAttribute("data-still-pt", still.replace(/\.(en|es)\.jpg$/i, ".jpg"));
        still = el.getAttribute("data-still-pt") || still;
      }
      if (still) {
        const nextStill = mediaSrc(still, lang);
        el.setAttribute("poster", nextStill);
        el.setAttribute("data-still", nextStill);
      }
    }
  }

  const LANG_HTML =
    '<button type="button" data-lang="pt">' +
      '<span class="flag" aria-hidden="true"><svg viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="15" fill="#009b3a"/><polygon points="11,1.6 20.4,7.5 11,13.4 1.6,7.5" fill="#fedf00"/><circle cx="11" cy="7.5" r="3.15" fill="#002776"/></svg></span>' +
      "Português</button>" +
    '<button type="button" data-lang="en">' +
      '<span class="flag" aria-hidden="true"><svg viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="15" fill="#b22234"/><rect y="1.15" width="22" height="1.15" fill="#fff"/><rect y="3.46" width="22" height="1.15" fill="#fff"/><rect y="5.77" width="22" height="1.15" fill="#fff"/><rect y="8.08" width="22" height="1.15" fill="#fff"/><rect y="10.38" width="22" height="1.15" fill="#fff"/><rect y="12.69" width="22" height="1.15" fill="#fff"/><rect width="8.8" height="8.05" fill="#3c3b6e"/></svg></span>' +
      "English</button>" +
    '<button type="button" data-lang="es">' +
      '<span class="flag" aria-hidden="true"><svg viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="15" fill="#c60b1e"/><rect y="3.75" width="22" height="7.5" fill="#ffc400"/></svg></span>' +
      "Español</button>";

  function injectCss() {
    if (document.getElementById("guia-lang-css")) return;
    const s = document.createElement("style");
    s.id = "guia-lang-css";
    s.textContent =
      ".langs{display:flex;flex-wrap:wrap;align-items:center;gap:16px 20px}" +
      ".langs button{display:inline-flex;align-items:center;gap:8px;margin:0;padding:8px 0;border:0;background:transparent;color:#000;font:inherit;font-size:.95rem;font-weight:500;line-height:1;cursor:pointer;-webkit-tap-highlight-color:transparent}" +
      ".langs button[aria-pressed=\"true\"]{background:transparent;color:var(--green,#1c4c23);font-weight:700}" +
      ".langs .flag{display:block;width:22px;height:15px;border:1px solid #4a4a4a;border-radius:1px;overflow:hidden;flex:0 0 auto;background:#fff}" +
      ".langs .flag svg{display:block;width:100%;height:100%}" +
      ".hero .langs{margin:0 0 20px}";
    document.head.appendChild(s);
  }

  function paintLangSwitch(box) {
    if (!box) return;
    const lang = getLang();
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", t("langGroup"));
    box.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });
  }

  function onLangClick(e) {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    const lang = setLang(btn.getAttribute("data-lang"));
    document.querySelectorAll(".langs").forEach(paintLangSwitch);
    const id = document.documentElement.getAttribute("data-guide");
    if (id) applyGuide(id);
    else applyIndex();
    document.dispatchEvent(new CustomEvent("guia-langchange", { detail: { lang: lang } }));
  }

  function ensureLangSwitch() {
    injectCss();
    let box = document.querySelector(".langs");
    if (!box) {
      box = document.createElement("div");
      box.className = "langs";
      box.innerHTML = LANG_HTML;
      const header = document.querySelector("header");
      const titleRow = header && header.querySelector(".title-row");
      if (titleRow) titleRow.insertAdjacentElement("afterend", box);
      else if (header) header.insertBefore(box, header.firstChild);
    } else if (!box.querySelector(".flag")) {
      box.innerHTML = LANG_HTML;
    }
    if (!box.dataset.wired) {
      box.dataset.wired = "1";
      box.addEventListener("click", onLangClick);
    }
    paintLangSwitch(box);
    return box;
  }

  function applyIndex() {
    const lang = getLang();
    document.documentElement.lang = HTML_LANG[lang];
    document.title = INDEX.title[lang];
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", INDEX.description[lang]);
    const h1 = document.querySelector("h1");
    if (h1) h1.textContent = INDEX.heading[lang];
    const welcome = document.querySelector(".welcome");
    if (welcome) welcome.textContent = INDEX.welcome[lang];
    const logo = document.querySelector(".brand");
    if (logo) logo.alt = INDEX.logoAlt[lang];
    const searchLabel = document.querySelector(".search .sr-only");
    if (searchLabel) searchLabel.textContent = INDEX.search[lang];
    const search = document.getElementById("busca");
    if (search) {
      search.placeholder = INDEX.search[lang];
      search.setAttribute("aria-label", INDEX.search[lang]);
    }
    const topics = document.getElementById("topics-title");
    if (topics) topics.textContent = INDEX.topics[lang];
    const empty = document.getElementById("vazio");
    if (empty) empty.textContent = INDEX.empty[lang];
    INDEX.cards.forEach(function (card) {
      const a = document.querySelector('.guide[href="' + card.href + '"]');
      if (!a) return;
      a.dataset.search = card.search;
      const title = a.querySelector("h3");
      const p = a.querySelector(".guide-body p");
      const meta = a.querySelector(".meta");
      if (title) title.textContent = card.title[lang];
      if (p) p.textContent = card.desc[lang];
      if (meta) meta.textContent = card.meta[lang];
    });
    ensureLangSwitch();
  }

  function homeHref(lang) {
    return "index.html" + (lang === "pt" ? "" : "?lang=" + lang);
  }

  function applyGuide(id) {
    const lang = getLang();
    if (id === "isencao" && lang !== "pt") {
      location.replace(homeHref(lang));
      return;
    }
    const g = GUIDES[id];
    if (!g) return;
    document.documentElement.lang = HTML_LANG[lang];
    document.documentElement.setAttribute("data-guide", id);
    document.title = g.title[lang];
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", g.description[lang]);
    const skip = document.querySelector(".skip");
    if (skip) skip.textContent = t("skip");
    const back = document.querySelector(".back");
    if (back) back.setAttribute("aria-label", t("back"));
    const h1 = document.querySelector("header h1");
    if (h1) h1.textContent = g.title[lang];
    const lede = document.querySelector(".lede");
    if (lede) lede.textContent = g.lede[lang];
    const narrateBtn = document.getElementById("narrate");
    if (narrateBtn) narrateBtn.setAttribute("title", t("narrate"));
    const progress = document.querySelector(".progress");
    if (progress) progress.setAttribute("aria-label", t("progress"));
    const slides = document.querySelectorAll(".slide");
    const total = slides.length;
    slides.forEach(function (slide, i) {
      const s = g.steps[i];
      if (!s) return;
      slide.dataset.narrate = s.narrate[lang];
      const kicker = slide.querySelector(".kicker");
      if (kicker) kicker.textContent = t("stepOf", i + 1, total);
      const h2 = slide.querySelector("h2");
      if (h2) h2.textContent = s.title[lang];
      const media = slide.querySelector("video, img");
      if (media) {
        applyLocalizedMedia(media, lang);
        if (media.tagName === "VIDEO") media.setAttribute("aria-label", s.alt[lang]);
        else media.alt = s.alt[lang];
      }
      const replay = slide.querySelector(".replay-gif");
      if (replay) replay.textContent = t("replay");
      const ol = slide.querySelector(".howto ol");
      if (ol) {
        ol.innerHTML = s.howto.map(function (item) { return "<li>" + item[lang] + "</li>"; }).join("");
      }
      const tip = slide.querySelector(".tip");
      if (tip) tip.innerHTML = "<strong>" + s.tipLabel[lang] + "</strong>" + s.tipHtml[lang];
      const dot = document.querySelector('.progress button[data-go="' + i + '"]');
      if (dot) dot.setAttribute("aria-label", t("stepAria", i + 1, s.title[lang]));
    });
    const done = document.getElementById("done");
    if (done) {
      done.dataset.narrate = g.doneNarrate[lang];
      const k = done.querySelector(".done-hero .kicker");
      if (k) k.textContent = t("doneKicker");
      const dh = done.querySelector("h2");
      if (dh) dh.textContent = t("doneTitle");
      const lead = done.querySelector(".done-lead");
      if (lead) lead.textContent = g.doneLead[lang];
      const tip = done.querySelector(".tip");
      if (tip) tip.innerHTML = "<strong>" + g.doneTipLabel[lang] + "</strong>" + g.doneTipHtml[lang];
    }
    document.querySelectorAll("audio[data-step-audio]").forEach(function (el) {
      const n = Number(el.dataset.stepAudio);
      let ptSrc = "";
      if (n < total) ptSrc = slides[n].getAttribute("data-audio");
      else if (done) ptSrc = done.getAttribute("data-audio");
      if (ptSrc) {
        el.src = voiceSrc(ptSrc, lang);
      }
    });
    const prev = document.getElementById("prev");
    if (prev) prev.setAttribute("aria-label", t("prev"));
    const next = document.getElementById("next");
    if (next) next.setAttribute("aria-label", t("next"));
  }

  window.GuiaI18n = {
    getLang: getLang,
    setLang: setLang,
    t: t,
    applyIndex: applyIndex,
    applyGuide: applyGuide,
    INDEX: INDEX,
    HTML_LANG: HTML_LANG,
    GUIDES: GUIDES
  };
})();
