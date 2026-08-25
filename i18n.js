(function () {
  const KEY = "guia-lang";
  const LANGS = ["pt", "en", "es"];
  const HTML_LANG = { pt: "pt-BR", en: "en", es: "es" };

  const UI = {
    pt: {
      langGroup: "Idioma",
      skip: "Ir para o conteúdo do passo",
      back: "Voltar ao início",
      narrate: "Narração",
      narrateOn: "Narração ligada. Toque para desligar",
      narrateOff: "Narração desligada. Toque para ligar",
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
      narrate: "Narration",
      narrateOn: "Narration on. Tap to turn off",
      narrateOff: "Narration off. Tap to turn on",
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
      narrate: "Narración",
      narrateOn: "Narración activada. Toque para desactivar",
      narrateOff: "Narración desactivada. Toque para activar",
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
      en: "Turista por Natureza guides: registration, environmental fee, refund, ownership change, exemption, importing members, and receipt.",
      es: "Guías de Turista por Natureza: cadastro, tasa ambiental, reembolso, titularidad, exención, importar integrantes y comprobante."
    },
    heading: { pt: "Como usar o sistema", en: "How to use the system", es: "Cómo usar el sistema" },
    welcome: {
      pt: "Passo a passo para usar o aplicativo na sua viagem. Escolha um tópico e siga na tela, no seu ritmo.",
      en: "A step-by-step path to use the app on your trip. Pick a topic and follow along at your own pace.",
      es: "Paso a paso para usar la aplicación en su viaje. Elija un tema y siga en la pantalla, a su ritmo."
    },
    search: { pt: "Buscar guia", en: "Search guide", es: "Buscar guía" },
    topics: { pt: "Guias", en: "Guides", es: "Guías" },
    empty: { pt: "Nenhum guia encontrado.", en: "No guide found.", es: "No se encontró ninguna guía." },
    logoAlt: { pt: "Turista por natureza", en: "Turista por natureza", es: "Turista por natureza" },
    cards: [
      {
        href: "guia-fazer-cadastro.html",
        title: { pt: "Como fazer seu cadastro", en: "How to create your account", es: "Cómo crear su cuenta" },
        desc: {
          pt: "Abra Novo Cadastro, preencha os dados obrigatórios e salve.",
          en: "Open Novo Cadastro, fill in the required details, and save.",
          es: "Abra Novo Cadastro, complete los datos obligatorios y guarde."
        },
        meta: { pt: "3 passos · com narração", en: "3 steps · with narration", es: "3 pasos · con narración" },
        search: "cadastro conta novo login nome cpf documento salvar signup register account"
      },
      {
        href: "guia-taxa-ambiental.html",
        title: { pt: "Como pagar a Taxa de Conservação Ambiental", en: "How to pay the environmental fee", es: "Cómo pagar la tasa ambiental" },
        desc: {
          pt: "Cadastre-se, crie o grupo e pague a Taxa de Conservação Ambiental.",
          en: "Register, create the group, and pay the environmental fee.",
          es: "Regístrese, cree el grupo y pague la tasa ambiental."
        },
        meta: { pt: "6 passos · com narração", en: "6 steps · with narration", es: "6 pasos · con narración" },
        search: "pagar pagamento taxa ambiental cadastro grupo cartao pix comprovante pay fee environmental card register"
      },
      {
        href: "guia-pedido-reembolso.html",
        title: { pt: "Como pedir o reembolso", en: "How to request a refund", es: "Cómo pedir el reembolso" },
        desc: {
          pt: "Abra a taxa ambiental, solicite a devolução e confirme no pagamento.",
          en: "Open the environmental fee, request the refund, and confirm on the payment.",
          es: "Abra la tasa ambiental, solicite la devolución y confirme en el pago."
        },
        meta: { pt: "3 passos · com narração", en: "3 steps · with narration", es: "3 pasos · con narración" },
        search: "reembolso devolucao devolver pagamento dinheiro refund payment money devolución"
      },
      {
        href: "guia-mudanca-titularidade.html",
        title: { pt: "Como mudar o titular da taxa ou data", en: "How to change the fee holder or date", es: "Cómo cambiar el titular de la tasa o la fecha" },
        desc: {
          pt: "Transfira a taxa ambiental de uma pessoa para outra no grupo.",
          en: "Transfer the environmental fee from one person to another in the group.",
          es: "Transfiera la tasa ambiental de una persona a otra en el grupo."
        },
        meta: { pt: "4 passos · com narração", en: "4 steps · with narration", es: "4 pasos · con narración" },
        search: "titular titularidade transferir mudar troca pessoa data datas date holder ownership change transfer"
      },
      {
        href: "guia-isencao-bonitense.html",
        title: { pt: "Como pedir isenção da taxa", en: "How to request a fee exemption", es: "Cómo pedir la exención de la tasa" },
        desc: {
          pt: "Residente de Bonito solicita isenção com documento e comprovante de residência.",
          en: "A Bonito resident requests an exemption with ID and proof of residence.",
          es: "Un residente de Bonito solicita la exención con documento y comprobante de residencia."
        },
        meta: { pt: "4 passos · com narração", en: "4 steps · with narration", es: "4 pasos · con narración" },
        search: "isencao insencao bonitense morador residente bonito documentos comprovante exemption resident"
      },
      {
        href: "guia-importar-integrantes.html",
        title: { pt: "Como importar integrantes", en: "How to import members", es: "Cómo importar integrantes" },
        desc: {
          pt: "Traga para o grupo quem já tem cadastro, pelo QR Code ou pelo documento.",
          en: "Bring someone who already has an account into the group, by QR Code or document number.",
          es: "Traiga al grupo a quien ya tiene cadastro, por código QR o por documento."
        },
        meta: { pt: "3 passos · com narração", en: "3 steps · with narration", es: "3 pasos · con narración" },
        search: "importar integrantes passageiros qr code documento cadastro grupo import members passengers"
      },
      {
        href: "guia-imprimir-comprovante.html",
        title: { pt: "Como imprimir o comprovante", en: "How to print the receipt", es: "Cómo imprimir el comprobante" },
        desc: {
          pt: "Abra o pedido pago da taxa ambiental e imprima o recibo oficial.",
          en: "Open the paid environmental-fee order and print the official receipt.",
          es: "Abra el pedido pagado de la tasa ambiental e imprima el recibo oficial."
        },
        meta: { pt: "4 passos · com narração", en: "4 steps · with narration", es: "4 pasos · con narración" },
        search: "imprimir comprovante recibo pdf impressao historico pago print receipt voucher paid"
      }
    ]
  };

  const GUIDES = {
    taxa: {
      title: { pt: "Como pagar a Taxa de Conservação Ambiental", en: "How to pay the environmental fee", es: "Cómo pagar la tasa ambiental" },
      description: {
        pt: "Guia passo a passo para se cadastrar, criar o grupo e pagar a Taxa de Conservação Ambiental de Bonito.",
        en: "Step-by-step guide to register, create the group, and pay the Taxa de Conservação Ambiental de Bonito.",
        es: "Guía paso a paso para registrarse, crear el grupo y pagar la Taxa de Conservação Ambiental de Bonito."
      },
      lede: {
        pt: "Turista por Natureza · cadastre-se, crie o grupo e pague a taxa",
        en: "Turista por Natureza · register, create the group, and pay the fee",
        es: "Turista por Natureza · regístrese, cree el grupo y pague la tasa"
      },
      statusDone: {
        pt: "Tudo certo · confira o status Pago",
        en: "All set · check the Pago status",
        es: "Listo · compruebe el estado Pago"
      },
      doneNarrate: {
        pt: "Guia concluído. Você se cadastrou, criou o grupo e pagou a taxa. No aplicativo, confira se o status ficou Pago.",
        en: "Guide complete. You registered, created the group, and paid the fee. In the app, check that the status is Pago.",
        es: "Guía completada. Se registró, creó el grupo y pagó la tasa. En la aplicación, compruebe que el estado quedó Pago."
      },
      doneLead: {
        pt: "Cadastre-se, crie o grupo, pague a taxa e só saia da tela depois de ver o status Pago.",
        en: "Register, create the group, pay the fee, and leave the screen only after you see the status Pago.",
        es: "Regístrese, cree el grupo, pague la tasa y salga de la pantalla solo después de ver el estado Pago."
      },
      doneTipLabel: { pt: "Pix", en: "Pix", es: "Pix" },
      doneTipHtml: {
        pt: "No passo <b>Modo</b>, a aba Pix gera o QR para pagar no app do banco. Sem dia marcado, o botão <b>Pagar</b> não aparece.",
        en: "In the <b>Modo</b> step, the Pix tab creates the QR to pay in the bank app. Without a marked day, the <b>Pagar</b> button does not appear.",
        es: "En el paso <b>Modo</b>, la pestaña Pix genera el QR para pagar en la app del banco. Sin un día marcado, el botón <b>Pagar</b> no aparece."
      },
      steps: [
        {
          title: { pt: "Toque em Novo Cadastro", en: "Tap Novo Cadastro", es: "Toque Novo Cadastro" },
          narrate: {
            pt: "Na tela de login, toque em Novo Cadastro.",
            en: "On the login screen, tap Novo Cadastro.",
            es: "En la pantalla de acceso, toque Novo Cadastro."
          },
          alt: {
            pt: "Tela de login do Turista por Natureza, com o ponteiro no botão Novo Cadastro.",
            en: "Turista por Natureza login screen, with the pointer on the Novo Cadastro button.",
            es: "Pantalla de acceso de Turista por Natureza, con el puntero en el botón Novo Cadastro."
          },
          howto: [
            { pt: "Abra o aplicativo ou o site <b>Turista por Natureza</b>.", en: "Open the <b>Turista por Natureza</b> app or website.", es: "Abra la aplicación o el sitio <b>Turista por Natureza</b>." },
            { pt: "Na tela de login, toque em <b>Novo Cadastro</b>.", en: "On the login screen, tap <b>Novo Cadastro</b>.", es: "En la pantalla de acceso, toque <b>Novo Cadastro</b>." }
          ],
          tipLabel: { pt: "Este caminho", en: "This path", es: "Este camino" },
          tipHtml: {
            pt: "Este guia usa o caminho clássico. Não use o atalho <b>Pagar minha Tx. Ambiental</b>.",
            en: "This guide uses the classic path. Do not use the <b>Pagar minha Tx. Ambiental</b> shortcut.",
            es: "Esta guía usa el camino clásico. No use el atajo <b>Pagar minha Tx. Ambiental</b>."
          }
        },
        {
          title: { pt: "Preencha os campos obrigatórios", en: "Fill in the required fields", es: "Complete los campos obligatorios" },
          narrate: {
            pt: "Preencha os campos obrigatórios, os que têm asterisco. Informe o nome. Escolha o sexo. Informe a data de nascimento. No Brasil, o tipo de documento é o CPF. Digite o número do documento. Confira o país. Escolha o estado. Depois escolha a cidade. Siga a ordem da tela, de cima para baixo. Confira o estado e a cidade da viagem antes de seguir.",
            en: "Fill in the required fields, the ones with an asterisk. Enter the name. Choose the sex. Enter the date of birth. In Brazil, the document type is CPF. Type the document number. Check the country. Choose the state. Then choose the city. Follow the order on the screen, from top to bottom. Check the trip state and city before you continue.",
            es: "Complete los campos obligatorios, los que tienen asterisco. Informe el nombre. Elija el sexo. Informe la fecha de nacimiento. En Brasil, el tipo de documento es el CPF. Escriba el número del documento. Confirme el país. Elija el estado. Después elija la ciudad. Siga el orden de la pantalla, de arriba hacia abajo. Confirme el estado y la ciudad del viaje antes de seguir."
          },
          alt: {
            pt: "Formulário de cadastro, com nome, sexo, nascimento, CPF, país, UF e cidade.",
            en: "Registration form, with name, sex, date of birth, CPF, country, state, and city.",
            es: "Formulario de cadastro, con nombre, sexo, nacimiento, CPF, país, UF y ciudad."
          },
          howto: [
            { pt: "Preencha <b>Nome</b>, <b>Sexo</b> e <b>Nascimento</b>.", en: "Fill in <b>Nome</b>, <b>Sexo</b>, and <b>Nascimento</b>.", es: "Complete <b>Nome</b>, <b>Sexo</b> y <b>Nascimento</b>." },
            { pt: "Informe o tipo e o número do <b>documento</b>. No Brasil, use o CPF.", en: "Enter the <b>document</b> type and number. In Brazil, use the CPF.", es: "Informe el tipo y el número del <b>documento</b>. En Brasil, use el CPF." },
            { pt: "Confira <b>País</b>, <b>UF</b> e <b>Cidade</b>.", en: "Check <b>País</b>, <b>UF</b>, and <b>Cidade</b>.", es: "Confirme <b>País</b>, <b>UF</b> y <b>Cidade</b>." },
            { pt: "Se você for o dono do cadastro, desmarque <b>Permitir alteração do cadastro por terceiros</b>.", en: "If you own this registration, uncheck <b>Permitir alteração do cadastro por terceiros</b>.", es: "Si usted es el dueño del cadastro, desmarque <b>Permitir alteração do cadastro por terceiros</b>." }
          ],
          tipLabel: { pt: "Nome", en: "Name", es: "Nombre" },
          tipHtml: {
            pt: "Use nome e sobrenome, se o app pedir.",
            en: "Use first and last name if the app asks for them.",
            es: "Use nombre y apellido, si la aplicación lo pide."
          }
        },
        {
          title: { pt: "Celular, e-mail e Salvar", en: "Mobile, email, and Save", es: "Celular, correo y Salvar" },
          narrate: {
            pt: "Role até Dados Opcionais. Toque em Senha e deixe em branco para usar o celular como senha. Preencha o celular e o e-mail. Sem eles, o botão de criar grupo fica bloqueado. Toque em Salvar. Se o cadastro for aceito, aparece o aviso de sucesso.",
            en: "Scroll to Dados Opcionais. Tap Senha and leave it blank to use the mobile number as the password. Fill in the mobile number and email. Without them, the create-group button stays locked. Tap Salvar. If the registration is accepted, a success notice appears.",
            es: "Baje hasta Dados Opcionais. Toque Senha y déjela en blanco para usar el celular como contraseña. Complete el celular y el correo. Sin ellos, el botón de crear grupo queda bloqueado. Toque Salvar. Si el cadastro es aceptado, aparece el aviso de éxito."
          },
          alt: {
            pt: "Dados Opcionais, com senha em branco, celular, e-mail e o ponteiro em SALVAR.",
            en: "Dados Opcionais, with a blank password, mobile, email, and the pointer on SALVAR.",
            es: "Dados Opcionais, con contraseña en blanco, celular, correo y el puntero en SALVAR."
          },
          howto: [
            { pt: "Role até <b>Dados Opcionais</b>. Toque em <b>Senha</b> e deixe em branco.", en: "Scroll to <b>Dados Opcionais</b>. Tap <b>Senha</b> and leave it blank.", es: "Baje hasta <b>Dados Opcionais</b>. Toque <b>Senha</b> y déjela en blanco." },
            { pt: "Preencha <b>Celular</b> e <b>Email</b>.", en: "Fill in <b>Celular</b> and <b>Email</b>.", es: "Complete <b>Celular</b> y <b>Email</b>." },
            { pt: "Toque em <b>SALVAR</b>.", en: "Tap <b>SALVAR</b>.", es: "Toque <b>SALVAR</b>." }
          ],
          tipLabel: { pt: "Senha em branco", en: "Blank password", es: "Contraseña en blanco" },
          tipHtml: {
            pt: "O aviso da tela é: <b>Deixe em branco para usar o celular como senha</b>. Sem celular e e-mail, o app avisa e o mais de criar grupo fica bloqueado.",
            en: "The on-screen note is: <b>Deixe em branco para usar o celular como senha</b>. Without mobile and email, the app warns you and the create-group plus stays locked.",
            es: "El aviso de la pantalla es: <b>Deixe em branco para usar o celular como senha</b>. Sin celular y correo, la aplicación avisa y el más de crear grupo queda bloqueado."
          }
        },
        {
          title: { pt: "Crie o grupo e entre", en: "Create the group and enter", es: "Cree el grupo y entre" },
          narrate: {
            pt: "Feche o aviso, se aparecer. Abra a aba grupos. Toque no mais. Confira o período De e Até e toque em Salvar. Depois toque em Logar no grupo. Confira as datas do período antes de salvar.",
            en: "Close the notice if it appears. Open the grupos tab. Tap plus. Check the De and Até dates and tap Salvar. Then tap Logar no grupo. Check the trip dates before you save.",
            es: "Cierre el aviso, si aparece. Abra la pestaña grupos. Toque el más. Confirme el período De y Até y toque Salvar. Después toque Logar no grupo. Confirme las fechas del período antes de guardar."
          },
          alt: {
            pt: "Aba grupos, formulário do período e o botão Logar no grupo.",
            en: "Grupos tab, period form, and the Logar no grupo button.",
            es: "Pestaña grupos, formulario del período y el botón Logar no grupo."
          },
          howto: [
            { pt: "Feche o aviso <b>Cadastro realizado com sucesso</b>, se aparecer, e abra a aba <b>grupos</b>.", en: "Close the <b>Cadastro realizado com sucesso</b> notice, if it appears, and open the <b>grupos</b> tab.", es: "Cierre el aviso <b>Cadastro realizado com sucesso</b>, si aparece, y abra la pestaña <b>grupos</b>." },
            { pt: "Toque no <b>+</b>. Confira o período <b>De</b> e <b>Até</b> e toque em <b>Salvar</b>.", en: "Tap <b>+</b>. Check the <b>De</b> and <b>Até</b> dates and tap <b>Salvar</b>.", es: "Toque el <b>+</b>. Confirme el período <b>De</b> y <b>Até</b> y toque <b>Salvar</b>." },
            { pt: "Toque em <b>Logar no grupo</b>.", en: "Tap <b>Logar no grupo</b>.", es: "Toque <b>Logar no grupo</b>." }
          ],
          tipLabel: { pt: "Aviso do grupo", en: "Group prompt", es: "Aviso del grupo" },
          tipHtml: {
            pt: "Depois de salvar, o app pergunta se quer criar um grupo. Dá para fechar e abrir a aba <b>grupos</b> na barra de baixo.",
            en: "After saving, the app asks if you want to create a group. You can close it and open the <b>grupos</b> tab on the bottom bar.",
            es: "Después de guardar, la aplicación pregunta si quiere crear un grupo. Puede cerrar y abrir la pestaña <b>grupos</b> en la barra de abajo."
          }
        },
        {
          title: { pt: "Abra a taxa e toque em Pagar", en: "Open the fee and tap Pagar", es: "Abra la tasa y toque Pagar" },
          narrate: {
            pt: "Toque em Taxas e serviços. Depois toque em Taxa de Conservação Ambiental de Bonito. Na matriz, confira os dias marcados e o Valor a pagar. Toque em Pagar.",
            en: "Tap Taxas e serviços. Then tap Taxa de Conservação Ambiental de Bonito. On the grid, check the marked days and Valor a pagar. Tap Pagar.",
            es: "Toque Taxas e serviços. Después toque Taxa de Conservação Ambiental de Bonito. En la matriz, confirme los días marcados y el Valor a pagar. Toque Pagar."
          },
          alt: {
            pt: "No grupo, o ponteiro abre Taxas e serviços, escolhe a taxa e toca em Pagar.",
            en: "In the group, the pointer opens Taxas e serviços, chooses the fee, and taps Pagar.",
            es: "En el grupo, el puntero abre Taxas e serviços, elige la tasa y toca Pagar."
          },
          howto: [
            { pt: "Toque em <b>Taxas e serviços</b> e depois em <b>Taxa de Conservação Ambiental de Bonito</b>.", en: "Tap <b>Taxas e serviços</b> and then <b>Taxa de Conservação Ambiental de Bonito</b>.", es: "Toque <b>Taxas e serviços</b> y después <b>Taxa de Conservação Ambiental de Bonito</b>." },
            { pt: "Na matriz, confira o <b>Valor a pagar</b>.", en: "On the grid, check <b>Valor a pagar</b>.", es: "En la matriz, confirme el <b>Valor a pagar</b>." },
            { pt: "Toque em <b>Pagar</b>.", en: "Tap <b>Pagar</b>.", es: "Toque <b>Pagar</b>." }
          ],
          tipLabel: { pt: "Sem o botão Pagar", en: "If Pagar is missing", es: "Si no aparece Pagar" },
          tipHtml: {
            pt: "Sem dia marcado, o botão <b>Pagar</b> não aparece. O botão fica no alto da tela Dados do grupo, à direita.",
            en: "Without a marked day, the <b>Pagar</b> button does not appear. The button is at the top of the Dados do grupo screen, on the right.",
            es: "Sin un día marcado, el botón <b>Pagar</b> no aparece. El botón está arriba de la pantalla Dados do grupo, a la derecha."
          }
        },
        {
          title: { pt: "Pague com cartão e confira Pago", en: "Pay by card and check Pago", es: "Pague con tarjeta y confirme Pago" },
          narrate: {
            pt: "Em Dados pagamento, confira o nome e toque em Prosseguir. Em Modo, toque na aba Cartão. Confira os dados e toque em Prosseguir. No passo Finalizado, o status deve ser Pago. Toque em Imprimir Comprovante se quiser o recibo, ou em Fechar.",
            en: "In Dados pagamento, check the name and tap Prosseguir. In Modo, tap the Cartão tab. Check the details and tap Prosseguir. In the Finalizado step, the status should be Pago. Tap Imprimir Comprovante if you want the receipt, or Fechar.",
            es: "En Dados pagamento, confirme el nombre y toque Prosseguir. En Modo, toque la pestaña Cartão. Confirme los datos y toque Prosseguir. En el paso Finalizado, el estado debe ser Pago. Toque Imprimir Comprovante si quiere el recibo, o Fechar."
          },
          alt: {
            pt: "Pagamento no cartão e a tela Finalizado com o status Pago e Imprimir Comprovante.",
            en: "Card payment and the Finalizado screen with the Pago status and Imprimir Comprovante.",
            es: "Pago con tarjeta y la pantalla Finalizado con el estado Pago e Imprimir Comprovante."
          },
          howto: [
            { pt: "Em <b>Dados pagamento</b>, confira o nome e toque em <b>Prosseguir</b>.", en: "In <b>Dados pagamento</b>, check the name and tap <b>Prosseguir</b>.", es: "En <b>Dados pagamento</b>, confirme el nombre y toque <b>Prosseguir</b>." },
            { pt: "Em <b>Modo</b>, toque na aba <b>Cartão</b> e depois em <b>Prosseguir</b>.", en: "In <b>Modo</b>, tap the <b>Cartão</b> tab and then <b>Prosseguir</b>.", es: "En <b>Modo</b>, toque la pestaña <b>Cartão</b> y después <b>Prosseguir</b>." },
            { pt: "No passo <b>Finalizado</b>, confira o status <b>Pago</b>. Toque em <b>Imprimir Comprovante</b> ou em <b>Fechar</b>.", en: "In the <b>Finalizado</b> step, check the status <b>Pago</b>. Tap <b>Imprimir Comprovante</b> or <b>Fechar</b>.", es: "En el paso <b>Finalizado</b>, confirme el estado <b>Pago</b>. Toque <b>Imprimir Comprovante</b> o <b>Fechar</b>." }
          ],
          tipLabel: { pt: "Pix", en: "Pix", es: "Pix" },
          tipHtml: {
            pt: "No mesmo passo <b>Modo</b>, a aba <b>Pix</b> gera o QR para pagar no app do banco.",
            en: "In the same <b>Modo</b> step, the <b>Pix</b> tab creates the QR to pay in the bank app.",
            es: "En el mismo paso <b>Modo</b>, la pestaña <b>Pix</b> genera el QR para pagar en la app del banco."
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
        es: "Guía completada. Después de guardar, use el documento y la contraseña o el celular para entrar. Luego puede crear el grupo y pagar la tasa ambiental."
      },
      doneLead: {
        pt: "Com o cadastro salvo, entre com o documento e a senha ou o celular. Depois crie o grupo e pague a taxa ambiental.",
        en: "With the registration saved, sign in with the document and the password or mobile number. Then create the group and pay the environmental fee.",
        es: "Con el cadastro guardado, entre con el documento y la contraseña o el celular. Luego cree el grupo y pague la tasa ambiental."
      },
      doneTipLabel: { pt: "Documento já cadastrado", en: "Document already registered", es: "Documento ya registrado" },
      doneTipHtml: {
        pt: "Se o documento já existir, o app pergunta se quer <b>importar os dados</b>.",
        en: "If the document already exists, the app asks whether you want to <b>import the data</b>.",
        es: "Si el documento ya existe, la aplicación pregunta si quiere <b>importar los datos</b>."
      },
      steps: [
        {
          title: { pt: "Toque em Novo Cadastro", en: "Tap Novo Cadastro", es: "Toque Novo Cadastro" },
          narrate: {
            pt: "Na tela de login, toque em Novo Cadastro.",
            en: "On the login screen, tap Novo Cadastro.",
            es: "En la pantalla de acceso, toque Novo Cadastro."
          },
          alt: {
            pt: "Tela de login do Turista por Natureza, com o ponteiro no botão Novo Cadastro.",
            en: "Turista por Natureza login screen, with the pointer on the Novo Cadastro button.",
            es: "Pantalla de acceso de Turista por Natureza, con el puntero en el botón Novo Cadastro."
          },
          howto: [
            { pt: "Abra o aplicativo ou o site <b>Turista por Natureza</b>.", en: "Open the <b>Turista por Natureza</b> app or website.", es: "Abra la aplicación o el sitio <b>Turista por Natureza</b>." },
            { pt: "Na tela de login, toque em <b>Novo Cadastro</b>.", en: "On the login screen, tap <b>Novo Cadastro</b>.", es: "En la pantalla de acceso, toque <b>Novo Cadastro</b>." }
          ],
          tipLabel: { pt: "Já tem cadastro?", en: "Already registered?", es: "¿Ya tiene cadastro?" },
          tipHtml: {
            pt: "Se vier de Pagar minha Tx. Ambiental, toque em <b>Sim</b> para voltar ao login ou em <b>Não</b> para o mesmo formulário.",
            en: "If you came from Pagar minha Tx. Ambiental, tap <b>Sim</b> to return to login or <b>Não</b> for the same form.",
            es: "Si viene de Pagar minha Tx. Ambiental, toque <b>Sim</b> para volver al acceso o <b>Não</b> para el mismo formulario."
          }
        },
        {
          title: { pt: "Preencha os campos obrigatórios", en: "Fill in the required fields", es: "Complete los campos obligatorios" },
          narrate: {
            pt: "Preencha os campos obrigatórios, os que têm asterisco. Informe o nome. Escolha o sexo. Informe a data de nascimento. No Brasil, o tipo de documento é o CPF. Digite o número do documento. Confira o país. Escolha o estado. Depois escolha a cidade. Siga a ordem da tela, de cima para baixo.",
            en: "Fill in the required fields, the ones with an asterisk. Enter the name. Choose the sex. Enter the date of birth. In Brazil, the document type is CPF. Type the document number. Check the country. Choose the state. Then choose the city. Follow the order on the screen, from top to bottom.",
            es: "Complete los campos obligatorios, los que tienen asterisco. Informe el nombre. Elija el sexo. Informe la fecha de nacimiento. En Brasil, el tipo de documento es el CPF. Escriba el número del documento. Confirme el país. Elija el estado. Después elija la ciudad. Siga el orden de la pantalla, de arriba hacia abajo."
          },
          alt: {
            pt: "Formulário de cadastro, com nome, sexo, nascimento, CPF, país, UF e cidade. O ponteiro indica os campos obrigatórios.",
            en: "Registration form, with name, sex, date of birth, CPF, country, state, and city. The pointer highlights the required fields.",
            es: "Formulario de cadastro, con nombre, sexo, nacimiento, CPF, país, UF y ciudad. El puntero indica los campos obligatorios."
          },
          howto: [
            { pt: "Preencha <b>Nome</b>, <b>Sexo</b> e <b>Nascimento</b>.", en: "Fill in <b>Nome</b>, <b>Sexo</b>, and <b>Nascimento</b>.", es: "Complete <b>Nome</b>, <b>Sexo</b> y <b>Nascimento</b>." },
            { pt: "Informe o tipo e o número do <b>documento</b>. No Brasil, use o CPF.", en: "Enter the <b>document</b> type and number. In Brazil, use the CPF.", es: "Informe el tipo y el número del <b>documento</b>. En Brasil, use el CPF." },
            { pt: "Confira <b>País</b>, <b>UF</b> e <b>Cidade</b>.", en: "Check <b>País</b>, <b>UF</b>, and <b>Cidade</b>.", es: "Confirme <b>País</b>, <b>UF</b> y <b>Cidade</b>." }
          ],
          tipLabel: { pt: "Nome", en: "Name", es: "Nombre" },
          tipHtml: {
            pt: "Use nome e sobrenome, se o app pedir.",
            en: "Use first and last name if the app asks for them.",
            es: "Use nombre y apellido, si la aplicación lo pide."
          }
        },
        {
          title: { pt: "Dados opcionais e salvar", en: "Optional details and save", es: "Datos opcionales y guardar" },
          narrate: {
            pt: "Abaixo ficam os dados opcionais. Role até o fim e toque em Salvar.",
            en: "Optional details are below. Scroll to the end and tap Salvar.",
            es: "Abajo están los datos opcionales. Baje hasta el final y toque Salvar."
          },
          alt: {
            pt: "Final do cadastro, com Dados Opcionais e o ponteiro no botão SALVAR.",
            en: "End of the registration, with Dados Opcionais and the pointer on the SALVAR button.",
            es: "Final del cadastro, con Dados Opcionais y el puntero en el botón SALVAR."
          },
          howto: [
            { pt: "Se quiser, preencha <b>celular</b>, <b>e-mail</b> e <b>senha</b> em Dados Opcionais.", en: "If you want, fill in <b>celular</b>, <b>e-mail</b>, and <b>senha</b> under Dados Opcionais.", es: "Si quiere, complete <b>celular</b>, <b>e-mail</b> y <b>senha</b> en Dados Opcionais." },
            { pt: "Se o cadastro for seu, desmarque <b>permitir alteração por terceiros</b>.", en: "If this registration is yours, uncheck <b>permitir alteração por terceiros</b>.", es: "Si el cadastro es suyo, desmarque <b>permitir alteração por terceiros</b>." },
            { pt: "Role até o fim e toque em <b>SALVAR</b>.", en: "Scroll to the end and tap <b>SALVAR</b>.", es: "Baje hasta el final y toque <b>SALVAR</b>." }
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
        en: "Guide complete. The refund request was sent. Track the status in Solicitações de reembolso, in the fee history.",
        es: "Guía completada. La solicitud de reembolso fue enviada. Siga el estado en Solicitações de reembolso, en el historial de la tasa."
      },
      doneLead: {
        pt: "O pedido de devolução sai da taxa ambiental e se confirma no pagamento. Acompanhe o andamento em Solicitações de reembolso, no histórico.",
        en: "The refund request starts from the environmental fee and is confirmed on the payment. Track it in Solicitações de reembolso, in the history.",
        es: "La solicitud de devolución sale de la tasa ambiental y se confirma en el pago. Siga el avance en Solicitações de reembolso, en el historial."
      },
      doneTipLabel: { pt: "Lembrete", en: "Reminder", es: "Recordatorio" },
      doneTipHtml: {
        pt: "Só peça devolução de pagamento se a taxa já estiver com o status <b>Pago</b>.",
        en: "Only request a payment refund if the fee already has the status <b>Pago</b>.",
        es: "Pida la devolución de pago solo si la tasa ya está con el estado <b>Pago</b>."
      },
      steps: [
        {
          title: { pt: "Abra Taxas e serviços", en: "Open Taxas e serviços", es: "Abra Taxas e serviços" },
          narrate: {
            pt: "Passo 1. Abra Taxas e serviços. No grupo, toque em Taxas e serviços. Depois toque em Taxa de Conservação Ambiental de Bonito.",
            en: "Step 1. Open Taxas e serviços. In the group, tap Taxas e serviços. Then tap Taxa de Conservação Ambiental de Bonito.",
            es: "Paso 1. Abra Taxas e serviços. En el grupo, toque Taxas e serviços. Luego toque Taxa de Conservação Ambiental de Bonito."
          },
          alt: {
            pt: "No grupo, o ponteiro toca em Taxas e serviços e depois na Taxa de Conservação Ambiental de Bonito.",
            en: "In the group, the pointer taps Taxas e serviços and then Taxa de Conservação Ambiental de Bonito.",
            es: "En el grupo, el puntero toca Taxas e serviços y luego Taxa de Conservação Ambiental de Bonito."
          },
          howto: [
            { pt: "Abra o <b>grupo</b> da viagem.", en: "Open the trip <b>grupo</b>.", es: "Abra el <b>grupo</b> del viaje." },
            { pt: "Toque em <b>Taxas e serviços</b>.", en: "Tap <b>Taxas e serviços</b>.", es: "Toque <b>Taxas e serviços</b>." },
            { pt: "Toque em <b>Taxa de Conservação Ambiental de Bonito</b>.", en: "Tap <b>Taxa de Conservação Ambiental de Bonito</b>.", es: "Toque <b>Taxa de Conservação Ambiental de Bonito</b>." }
          ],
          tipLabel: { pt: "Onde começar", en: "Where to start", es: "Dónde empezar" },
          tipHtml: {
            pt: "Esse botão fica no alto da tela Dados do grupo, à direita.",
            en: "This button is at the top of the Dados do grupo screen, on the right.",
            es: "Ese botón está en la parte alta de la pantalla Dados do grupo, a la derecha."
          }
        },
        {
          title: { pt: "Solicite a devolução", en: "Request the refund", es: "Solicite la devolución" },
          narrate: {
            pt: "Passo 2. Solicite a devolução. Confira se a taxa está com o status Pago. Toque em Solicitar devolução. Depois escolha Solicitar devolução de pagamento.",
            en: "Step 2. Request the refund. Check that the fee status is Pago. Tap Solicitar devolução. Then choose Solicitar devolução de pagamento.",
            es: "Paso 2. Solicite la devolución. Compruebe que la tasa está con el estado Pago. Toque Solicitar devolução. Luego elija Solicitar devolução de pagamento."
          },
          alt: {
            pt: "Na Taxa Ambiental, o ponteiro toca em Solicitar devolução e escolhe Solicitar devolução de pagamento.",
            en: "On Taxa Ambiental, the pointer taps Solicitar devolução and chooses Solicitar devolução de pagamento.",
            es: "En Taxa Ambiental, el puntero toca Solicitar devolução y elige Solicitar devolução de pagamento."
          },
          howto: [
            { pt: "Confira se o status está <b>Pago</b>.", en: "Check that the status is <b>Pago</b>.", es: "Compruebe que el estado está <b>Pago</b>." },
            { pt: "Toque em <b>Solicitar devolução</b>.", en: "Tap <b>Solicitar devolução</b>.", es: "Toque <b>Solicitar devolução</b>." },
            { pt: "Escolha <b>Solicitar devolução de pagamento</b>.", en: "Choose <b>Solicitar devolução de pagamento</b>.", es: "Elija <b>Solicitar devolução de pagamento</b>." }
          ],
          tipLabel: { pt: "Dois caminhos", en: "Two paths", es: "Dos caminos" },
          tipHtml: {
            pt: "Devolução de pagamento devolve o valor pago. Devolução de diárias é outro pedido, para dias da taxa.",
            en: "Devolução de pagamento returns the amount paid. Devolução de diárias is a different request, for fee days.",
            es: "Devolução de pagamento devuelve el valor pagado. Devolução de diárias es otra solicitud, para días de la tasa."
          }
        },
        {
          title: { pt: "Confirme no pagamento", en: "Confirm on the payment", es: "Confirme en el pago" },
          narrate: {
            pt: "Passo 3. Confirme no pagamento. No histórico, toque no pagamento com status Pago. Na tela de detalhes, toque em Reembolso, no canto inferior esquerdo.",
            en: "Step 3. Confirm on the payment. In the history, tap the payment with status Pago. On the details screen, tap Reembolso, in the lower-left corner.",
            es: "Paso 3. Confirme en el pago. En el historial, toque el pago con estado Pago. En la pantalla de detalles, toque Reembolso, en la esquina inferior izquierda."
          },
          alt: {
            pt: "Na tela de detalhes do pagamento, o ponteiro toca no botão vermelho Reembolso, no canto inferior esquerdo.",
            en: "On the payment details screen, the pointer taps the red Reembolso button, in the lower-left corner.",
            es: "En la pantalla de detalles del pago, el puntero toca el botón rojo Reembolso, en la esquina inferior izquierda."
          },
          howto: [
            { pt: "No <b>histórico</b>, toque no pagamento com status <b>Pago</b>.", en: "In the <b>histórico</b>, tap the payment with status <b>Pago</b>.", es: "En el <b>histórico</b>, toque el pago con estado <b>Pago</b>." },
            { pt: "Confira o valor e o código do pedido.", en: "Check the amount and the order code.", es: "Compruebe el valor y el código del pedido." },
            { pt: "Toque em <b>Reembolso</b>, no canto inferior esquerdo.", en: "Tap <b>Reembolso</b>, in the lower-left corner.", es: "Toque <b>Reembolso</b>, en la esquina inferior izquierda." }
          ],
          tipLabel: { pt: "Depois de enviar", en: "After sending", es: "Después de enviar" },
          tipHtml: {
            pt: "O andamento aparece na aba Solicitações de reembolso, no mesmo histórico.",
            en: "Progress appears in the Solicitações de reembolso tab, in the same history.",
            es: "El avance aparece en la pestaña Solicitações de reembolso, en el mismo historial."
          }
        }
      ]
    },
    titularidade: {
      title: { pt: "Como mudar o titular da taxa ou data", en: "How to change the fee holder or date", es: "Cómo cambiar el titular de la tasa o la fecha" },
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
        en: "The fee holder is changed in Taxas e serviços, under alteração de datas ou titularidade. Check in the group that the new holder is correct.",
        es: "La titularidad de la tasa se cambia en Taxas e serviços, en la opción de alteração de datas ou titularidade. Compruebe en el grupo que el nuevo titular quedó correcto."
      },
      doneTipLabel: { pt: "Lembrete", en: "Reminder", es: "Recordatorio" },
      doneTipHtml: {
        pt: "A pessoa que vai receber a taxa precisa já estar no grupo, em Passageiros.",
        en: "The person who will receive the fee must already be in the group, under Passageiros.",
        es: "La persona que va a recibir la tasa ya debe estar en el grupo, en Passageiros."
      },
      steps: [
        {
          title: { pt: "Abra Taxas e serviços", en: "Open Taxas e serviços", es: "Abra Taxas e serviços" },
          narrate: {
            pt: "Passo 1. Abra Taxas e serviços. No grupo, toque em Taxas e serviços. Depois toque em Taxa de Conservação Ambiental de Bonito.",
            en: "Step 1. Open Taxas e serviços. In the group, tap Taxas e serviços. Then tap Taxa de Conservação Ambiental de Bonito.",
            es: "Paso 1. Abra Taxas e serviços. En el grupo, toque Taxas e serviços. Luego toque Taxa de Conservação Ambiental de Bonito."
          },
          alt: {
            pt: "No grupo, o ponteiro toca em Taxas e serviços e depois na Taxa de Conservação Ambiental de Bonito.",
            en: "In the group, the pointer taps Taxas e serviços and then Taxa de Conservação Ambiental de Bonito.",
            es: "En el grupo, el puntero toca Taxas e serviços y luego Taxa de Conservação Ambiental de Bonito."
          },
          howto: [
            { pt: "Abra o <b>grupo</b> da viagem.", en: "Open the trip <b>grupo</b>.", es: "Abra el <b>grupo</b> del viaje." },
            { pt: "Toque em <b>Taxas e serviços</b>.", en: "Tap <b>Taxas e serviços</b>.", es: "Toque <b>Taxas e serviços</b>." },
            { pt: "Toque em <b>Taxa de Conservação Ambiental de Bonito</b>.", en: "Tap <b>Taxa de Conservação Ambiental de Bonito</b>.", es: "Toque <b>Taxa de Conservação Ambiental de Bonito</b>." }
          ],
          tipLabel: { pt: "Onde começar", en: "Where to start", es: "Dónde empezar" },
          tipHtml: {
            pt: "O caminho é o mesmo da taxa ambiental, no alto da tela Dados do grupo.",
            en: "The path is the same as the environmental fee, at the top of the Dados do grupo screen.",
            es: "El camino es el mismo de la tasa ambiental, en la parte alta de la pantalla Dados do grupo."
          }
        },
        {
          title: { pt: "Altere datas ou titularidade", en: "Change dates or ownership", es: "Cambie fechas o titularidad" },
          narrate: {
            pt: "Passo 2. Altere datas ou titularidade. Na taxa ambiental, toque em Alteração de datas ou titularidade. Não use Solicitar devolução neste fluxo.",
            en: "Step 2. Change dates or ownership. On the environmental fee, tap Alteração de datas ou titularidade. Do not use Solicitar devolução in this flow.",
            es: "Paso 2. Cambie fechas o titularidad. En la tasa ambiental, toque Alteração de datas ou titularidade. No use Solicitar devolução en este flujo."
          },
          alt: {
            pt: "Na Taxa Ambiental, o ponteiro toca no botão verde Alteração de datas ou titularidade.",
            en: "On Taxa Ambiental, the pointer taps the green Alteração de datas ou titularidade button.",
            es: "En Taxa Ambiental, el puntero toca el botón verde Alteração de datas ou titularidade."
          },
          howto: [
            { pt: "Na taxa ambiental, toque em <b>Alteração de datas ou titularidade</b>.", en: "On the environmental fee, tap <b>Alteração de datas ou titularidade</b>.", es: "En la tasa ambiental, toque <b>Alteração de datas ou titularidade</b>." },
            { pt: "Não use <b>Solicitar devolução</b> neste fluxo.", en: "Do not use <b>Solicitar devolução</b> in this flow.", es: "No use <b>Solicitar devolução</b> en este flujo." }
          ],
          tipLabel: { pt: "Atenção", en: "Attention", es: "Atención" },
          tipHtml: {
            pt: "O botão laranja pede reembolso. O verde, logo abaixo, é o da mudança de titular ou de datas.",
            en: "The orange button requests a refund. The green one below is for changing the holder or the dates.",
            es: "El botón naranja pide reembolso. El verde, justo abajo, es el del cambio de titular o de fechas."
          }
        },
        {
          title: { pt: "Escolha mudança de titular", en: "Choose holder change", es: "Elija cambio de titular" },
          narrate: {
            pt: "Passo 3. Escolha mudança de titular. Em Tipo de mudança, selecione Mudança de Titular da Taxa. Depois toque em Prosseguir.",
            en: "Step 3. Choose holder change. In Tipo de mudança, select Mudança de Titular da Taxa. Then tap Prosseguir.",
            es: "Paso 3. Elija cambio de titular. En Tipo de mudança, seleccione Mudança de Titular da Taxa. Luego toque Prosseguir."
          },
          alt: {
            pt: "No campo Tipo de mudança, o ponteiro escolhe Mudança de Titular da Taxa e toca em Prosseguir.",
            en: "In Tipo de mudança, the pointer chooses Mudança de Titular da Taxa and taps Prosseguir.",
            es: "En el campo Tipo de mudança, el puntero elige Mudança de Titular da Taxa y toca Prosseguir."
          },
          howto: [
            { pt: "Em <b>Tipo de mudança</b>, toque na lista.", en: "In <b>Tipo de mudança</b>, tap the list.", es: "En <b>Tipo de mudança</b>, toque la lista." },
            { pt: "Selecione <b>Mudança de Titular da Taxa</b>.", en: "Select <b>Mudança de Titular da Taxa</b>.", es: "Seleccione <b>Mudança de Titular da Taxa</b>." },
            { pt: "Toque em <b>Prosseguir</b>.", en: "Tap <b>Prosseguir</b>.", es: "Toque <b>Prosseguir</b>." }
          ],
          tipLabel: { pt: "Não confunda", en: "Do not mix them up", es: "No los confunda" },
          tipHtml: {
            pt: "Mudança de Dia altera as datas. Para trocar a pessoa da taxa, use Mudança de Titular da Taxa.",
            en: "Mudança de Dia changes the dates. To change the person on the fee, use Mudança de Titular da Taxa.",
            es: "Mudança de Dia cambia las fechas. Para cambiar a la persona de la tasa, use Mudança de Titular da Taxa."
          }
        },
        {
          title: { pt: "Indique de quem para quem", en: "Choose from and to", es: "Indique de quién a quién" },
          narrate: {
            pt: "Passo 4. Indique de quem para quem. Em De, escolha quem deixa de ser o titular. Em Para, escolha o novo titular da taxa.",
            en: "Step 4. Choose from and to. In De, choose who stops being the holder. In Para, choose the new fee holder.",
            es: "Paso 4. Indique de quién a quién. En De, elija quién deja de ser el titular. En Para, elija el nuevo titular de la tasa."
          },
          alt: {
            pt: "Nas listas De e Para, o ponteiro escolhe o titular atual e o novo titular da taxa.",
            en: "In the De and Para lists, the pointer chooses the current holder and the new fee holder.",
            es: "En las listas De y Para, el puntero elige el titular actual y el nuevo titular de la tasa."
          },
          howto: [
            { pt: "Em <b>De</b>, escolha quem deixa de ser o titular.", en: "In <b>De</b>, choose who stops being the holder.", es: "En <b>De</b>, elija quién deja de ser el titular." },
            { pt: "Em <b>Para</b>, escolha o <b>novo titular</b> da taxa.", en: "In <b>Para</b>, choose the <b>new holder</b> of the fee.", es: "En <b>Para</b>, elija el <b>nuevo titular</b> de la tasa." }
          ],
          tipLabel: { pt: "Antes de seguir", en: "Before you continue", es: "Antes de seguir" },
          tipHtml: {
            pt: "Cadastre a outra pessoa em Passageiros se ela ainda não estiver no grupo.",
            en: "Register the other person in Passageiros if they are not already in the group.",
            es: "Registre a la otra persona en Passageiros si aún no está en el grupo."
          }
        }
      ]
    },
    isencao: {
      title: { pt: "Como pedir isenção da taxa", en: "How to request a fee exemption", es: "Cómo pedir la exención de la tasa" },
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
        en: "Guide complete. After attaching ID and proof of residence, go back to Solicitações and tap Solicitar isenção again. Approval depends on the city hall schedule.",
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
        en: "The group’s three-dot menu does <b>not</b> list Solicitações. The path is Passageiros, Detalhes, Solicitações.",
        es: "El menú de tres puntos del grupo <b>no</b> lista Solicitações. El camino es Passageiros, Detalhes, Solicitações."
      },
      steps: [
        {
          title: { pt: "Abra Passageiros", en: "Open Passageiros", es: "Abra Passageiros" },
          narrate: {
            pt: "Passo 1. Abra Passageiros. Entre no grupo e, na barra de baixo, toque em Passageiros.",
            en: "Step 1. Open Passageiros. Go into the group and, on the bottom bar, tap Passageiros.",
            es: "Paso 1. Abra Passageiros. Entre en el grupo y, en la barra de abajo, toque Passageiros."
          },
          alt: {
            pt: "No grupo, o ponteiro toca na aba Passageiros, na barra inferior.",
            en: "In the group, the pointer taps the Passageiros tab on the bottom bar.",
            es: "En el grupo, el puntero toca la pestaña Passageiros, en la barra inferior."
          },
          howto: [
            { pt: "Entre no <b>grupo</b>.", en: "Go into the <b>grupo</b>.", es: "Entre en el <b>grupo</b>." },
            { pt: "Na barra inferior, toque em <b>Passageiros</b>.", en: "On the bottom bar, tap <b>Passageiros</b>.", es: "En la barra inferior, toque <b>Passageiros</b>." }
          ],
          tipLabel: { pt: "Quem pode pedir", en: "Who can request it", es: "Quién puede pedirla" },
          tipHtml: {
            pt: "A isenção é para <b>residente de Bonito/MS</b>. O aparelho precisa estar no Mato Grosso do Sul.",
            en: "The exemption is for a <b>Bonito/MS resident</b>. The device must be in Mato Grosso do Sul.",
            es: "La exención es para <b>residente de Bonito/MS</b>. El aparato debe estar en Mato Grosso do Sul."
          }
        },
        {
          title: { pt: "Abra Solicitações", en: "Open Solicitações", es: "Abra Solicitações" },
          narrate: {
            pt: "Passo 2. Abra Solicitações. No passageiro, toque em Detalhes. No alto do cadastro, toque em Solicitações.",
            en: "Step 2. Open Solicitações. On the passenger, tap Detalhes. At the top of the registration, tap Solicitações.",
            es: "Paso 2. Abra Solicitações. En el pasajero, toque Detalhes. En la parte alta del cadastro, toque Solicitações."
          },
          alt: {
            pt: "No cadastro do passageiro, o ponteiro toca no botão Solicitações, no alto à direita.",
            en: "On the passenger registration, the pointer taps the Solicitações button, at the top right.",
            es: "En el cadastro del pasajero, el puntero toca el botón Solicitações, arriba a la derecha."
          },
          howto: [
            { pt: "No passageiro, toque em <b>Detalhes</b>.", en: "On the passenger, tap <b>Detalhes</b>.", es: "En el pasajero, toque <b>Detalhes</b>." },
            { pt: "No alto do cadastro, toque em <b>Solicitações</b>.", en: "At the top of the registration, tap <b>Solicitações</b>.", es: "En la parte alta del cadastro, toque <b>Solicitações</b>." }
          ],
          tipLabel: { pt: "Caminho certo", en: "The right path", es: "Camino correcto" },
          tipHtml: {
            pt: "Solicitações não aparece no menu de três pontinhos do grupo.",
            en: "Solicitações does not appear in the group’s three-dot menu.",
            es: "Solicitações no aparece en el menú de tres puntos del grupo."
          }
        },
        {
          title: { pt: "Solicite a isenção", en: "Request the exemption", es: "Solicite la exención" },
          narrate: {
            pt: "Passo 3. Solicite a isenção. Toque em Solicitar isenção de taxa para residentes de Bonito, Mato Grosso do Sul. Confirme o alerta: é preciso documento pessoal e comprovante de residência.",
            en: "Step 3. Request the exemption. Tap Solicitar Insenção de Taxa para Residentes de Bonito/MS. Confirm the alert: you need personal ID and proof of residence.",
            es: "Paso 3. Solicite la exención. Toque Solicitar Insenção de Taxa para Residentes de Bonito/MS. Confirme la alerta: se necesita documento personal y comprobante de residencia."
          },
          alt: {
            pt: "Na lista Solicitações, o ponteiro toca em Solicitar isenção e confirma o alerta de documentos.",
            en: "In the Solicitações list, the pointer taps Solicitar isenção and confirms the document alert.",
            es: "En la lista Solicitações, el puntero toca Solicitar isenção y confirma la alerta de documentos."
          },
          howto: [
            { pt: "Toque em <b>Solicitar Insenção de Taxa para Residentes de Bonito/MS</b> — é o texto da tela.", en: "Tap <b>Solicitar Insenção de Taxa para Residentes de Bonito/MS</b> — that is the on-screen wording.", es: "Toque <b>Solicitar Insenção de Taxa para Residentes de Bonito/MS</b> — es el texto de la pantalla." },
            { pt: "Se o app pedir localização, toque em <b>Permitir</b>. A opção só aparece no <b>MS</b>.", en: "If the app asks for location, tap <b>Permitir</b>. The option only appears in <b>MS</b>.", es: "Si la aplicación pide ubicación, toque <b>Permitir</b>. La opción solo aparece en <b>MS</b>." },
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
            en: "Step 4. Attach the documents. On the Documentos screen, tap plus. Send the personal ID and the proof of residence. Then go back to Solicitações and tap solicitar isenção again.",
            es: "Paso 4. Adjunte los documentos. En la pantalla Documentos, toque el más. Envíe el documento personal y el comprobante de residencia. Luego vuelva a Solicitações y toque de nuevo solicitar isenção."
          },
          alt: {
            pt: "Na tela Documentos, o menu mais mostra Comprovante residência, Documento pessoal e Selfie.",
            en: "On the Documentos screen, the plus menu shows Comprovante residência, Documento pessoal, and Selfie.",
            es: "En la pantalla Documentos, el menú más muestra Comprovante residência, Documento pessoal y Selfie."
          },
          howto: [
            { pt: "Na tela <b>Documentos</b>, toque no botão <b>+</b>.", en: "On the <b>Documentos</b> screen, tap the <b>+</b> button.", es: "En la pantalla <b>Documentos</b>, toque el botón <b>+</b>." },
            { pt: "Envie o <b>documento pessoal</b> (CPF, RG ou passaporte) e o <b>comprovante de residência</b>.", en: "Send the <b>personal ID</b> (CPF, RG, or passport) and the <b>proof of residence</b>.", es: "Envíe el <b>documento personal</b> (CPF, RG o pasaporte) y el <b>comprobante de residencia</b>." },
            { pt: "Volte em <b>Solicitações</b> e toque de novo em solicitar isenção.", en: "Go back to <b>Solicitações</b> and tap solicitar isenção again.", es: "Vuelva a <b>Solicitações</b> y toque de nuevo solicitar isenção." }
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
      title: { pt: "Como importar integrantes", en: "How to import members", es: "Cómo importar integrantes" },
      description: {
        pt: "Guia para trazer ao grupo alguém que já tem cadastro no Turista por Natureza, pelo QR Code ou pelo documento.",
        en: "Guide to bring into the group someone who already has a Turista por Natureza registration, by QR Code or document number.",
        es: "Guía para traer al grupo a alguien que ya tiene cadastro en Turista por Natureza, por código QR o por documento."
      },
      lede: {
        pt: "Turista por Natureza · importe quem já tem cadastro",
        en: "Turista por Natureza · import someone who already has an account",
        es: "Turista por Natureza · importe a quien ya tiene cadastro"
      },
      doneNarrate: {
        pt: "Guia concluído. Dá para importar pelo QR Code ou pelo número do documento. Confira os dados e toque em Salvar passageiro. Se a pessoa já estiver neste grupo, o app avisa e não importa de novo.",
        en: "Guide complete. You can import by QR Code or by document number. Check the details and tap Salvar passageiro. If the person is already in this group, the app warns you and does not import again.",
        es: "Guía completada. Se puede importar por código QR o por el número del documento. Compruebe los datos y toque Salvar passageiro. Si la persona ya está en este grupo, la aplicación avisa y no importa de nuevo."
      },
      doneLead: {
        pt: "Há dois jeitos de trazer alguém que já tem cadastro: ler o QR Code ou informar o documento e confirmar a importação.",
        en: "There are two ways to bring in someone who already has an account: read the QR Code, or enter the document and confirm the import.",
        es: "Hay dos formas de traer a alguien que ya tiene cadastro: leer el código QR o informar el documento y confirmar la importación."
      },
      doneTipLabel: { pt: "Outro caminho", en: "Another path", es: "Otro camino" },
      doneTipHtml: {
        pt: "Pelo documento: preencha o número, saia do campo, confirme o primeiro nome e toque em Sim. Dependente sem documento não entra por esse caminho.",
        en: "By document: fill in the number, leave the field, confirm the first name, and tap Sim. A dependent without a document cannot use this path.",
        es: "Por documento: complete el número, salga del campo, confirme el primer nombre y toque Sim. Un dependiente sin documento no entra por este camino."
      },
      steps: [
        {
          title: { pt: "Abra Passageiros", en: "Open Passageiros", es: "Abra Passageiros" },
          narrate: {
            pt: "Passo 1. Abra Passageiros. Entre no grupo e, na barra de baixo, toque em Passageiros.",
            en: "Step 1. Open Passageiros. Go into the group and, on the bottom bar, tap Passageiros.",
            es: "Paso 1. Abra Passageiros. Entre en el grupo y, en la barra de abajo, toque Passageiros."
          },
          alt: {
            pt: "No grupo, o ponteiro toca na aba Passageiros, na barra inferior.",
            en: "In the group, the pointer taps the Passageiros tab on the bottom bar.",
            es: "En el grupo, el puntero toca la pestaña Passageiros, en la barra inferior."
          },
          howto: [
            { pt: "Entre no <b>grupo</b>.", en: "Go into the <b>grupo</b>.", es: "Entre en el <b>grupo</b>." },
            { pt: "Na barra inferior, toque em <b>Passageiros</b>.", en: "On the bottom bar, tap <b>Passageiros</b>.", es: "En la barra inferior, toque <b>Passageiros</b>." }
          ],
          tipLabel: { pt: "Para quem é", en: "Who this is for", es: "Para quién es" },
          tipHtml: {
            pt: "Use este fluxo para trazer alguém que <b>já tem cadastro</b> no Turista por Natureza.",
            en: "Use this flow to bring in someone who <b>already has an account</b> in Turista por Natureza.",
            es: "Use este flujo para traer a alguien que <b>ya tiene cadastro</b> en Turista por Natureza."
          }
        },
        {
          title: { pt: "Abra Cadastro Passageiro", en: "Open Cadastro Passageiro", es: "Abra Cadastro Passageiro" },
          narrate: {
            pt: "Passo 2. Abra Cadastro Passageiro. Toque no botão mais, no canto inferior direito. No formulário, o documento é o campo usado para importar pelo número.",
            en: "Step 2. Open Cadastro Passageiro. Tap the plus button, in the lower-right corner. On the form, the document is the field used to import by number.",
            es: "Paso 2. Abra Cadastro Passageiro. Toque el botón más, en la esquina inferior derecha. En el formulario, el documento es el campo usado para importar por número."
          },
          alt: {
            pt: "No Cadastro Passageiro, o ponteiro indica o campo número do documento, com o tipo CPF.",
            en: "On Cadastro Passageiro, the pointer highlights the document-number field, with type CPF.",
            es: "En Cadastro Passageiro, el puntero indica el campo número del documento, con el tipo CPF."
          },
          howto: [
            { pt: "Toque no botão <b>+</b>, no canto inferior direito.", en: "Tap the <b>+</b> button, in the lower-right corner.", es: "Toque el botón <b>+</b>, en la esquina inferior derecha." },
            { pt: "Abre a tela <b>Cadastro Passageiro</b>.", en: "The <b>Cadastro Passageiro</b> screen opens.", es: "Se abre la pantalla <b>Cadastro Passageiro</b>." },
            { pt: "Para importar pelo documento: escolha o tipo, preencha <b>Num. Documento</b> e toque fora do campo.", en: "To import by document: choose the type, fill in <b>Num. Documento</b>, and tap outside the field.", es: "Para importar por documento: elija el tipo, complete <b>Num. Documento</b> y toque fuera del campo." }
          ],
          tipLabel: { pt: "Se o cadastro já existir", en: "If the registration already exists", es: "Si el cadastro ya existe" },
          tipHtml: {
            pt: "O app pergunta se quer importar os dados. Informe o <b>primeiro nome</b> e toque em <b>Sim</b>. Depois confira e salve.",
            en: "The app asks if you want to import the data. Enter the <b>first name</b> and tap <b>Sim</b>. Then check and save.",
            es: "La aplicación pregunta si quiere importar los datos. Informe el <b>primer nombre</b> y toque <b>Sim</b>. Luego compruebe y guarde."
          }
        },
        {
          title: { pt: "Importe com QR Code", en: "Import with QR Code", es: "Importe con código QR" },
          narrate: {
            pt: "Passo 3. Importe com QR Code. No topo, toque no ícone de QR Code. Autorize a câmera, se o celular pedir. Aponte para o QR da outra pessoa, no menu de três pontinhos do cadastro dela, ou na carteirinha. Confira os dados e toque em Salvar passageiro.",
            en: "Step 3. Import with QR Code. At the top, tap the QR Code icon. Allow the camera if the phone asks. Point at the other person’s QR, in the three-dot menu of their registration, or on the card. Check the details and tap Salvar passageiro.",
            es: "Paso 3. Importe con código QR. En la parte superior, toque el ícono de QR Code. Autorice la cámara si el celular lo pide. Apunte al QR de la otra persona, en el menú de tres puntos de su cadastro, o en la credencial. Compruebe los datos y toque Salvar passageiro."
          },
          alt: {
            pt: "Na tela Importar com QR Code, o ponteiro aponta o ícone de QR no alto à direita.",
            en: "On the Importar com QR Code screen, the pointer highlights the QR icon at the top right.",
            es: "En la pantalla Importar com QR Code, el puntero apunta el ícono de QR arriba a la derecha."
          },
          howto: [
            { pt: "No topo, toque no ícone de <b>QR Code</b> (Importar com QR Code).", en: "At the top, tap the <b>QR Code</b> icon (Importar com QR Code).", es: "En la parte superior, toque el ícono de <b>QR Code</b> (Importar com QR Code)." },
            { pt: "Autorize a câmera, se o celular pedir.", en: "Allow the camera if the phone asks.", es: "Autorice la cámara si el celular lo pide." },
            { pt: "Aponte para o QR da outra pessoa. Confira os dados e toque em <b>Salvar passageiro</b>.", en: "Point at the other person’s QR. Check the details and tap <b>Salvar passageiro</b>.", es: "Apunte al QR de la otra persona. Compruebe los datos y toque <b>Salvar passageiro</b>." }
          ],
          tipLabel: { pt: "Onde está o QR", en: "Where the QR is", es: "Dónde está el QR" },
          tipHtml: {
            pt: "No cadastro da pessoa: menu de três pontinhos e depois <b>QR Code</b>. Também vale a carteirinha.",
            en: "On the person’s registration: three-dot menu, then <b>QR Code</b>. The card also works.",
            es: "En el cadastro de la persona: menú de tres puntos y luego <b>QR Code</b>. También vale la credencial."
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
        en: "Guide complete. Only a paid order generates the official receipt. Check the code, locator, amount, name, and the paid status. Then tap Imprimir, or save as PDF.",
        es: "Guía completada. Solo el pedido pagado genera el comprobante oficial. Compruebe código, localizador, valor, nombre y el estado pago. Luego toque Imprimir, o guarde como PDF."
      },
      doneLead: {
        pt: "O comprovante oficial da Taxa de Conservação Ambiental sai só de pedido com status Pago. Confira os dados antes de imprimir.",
        en: "The official Taxa de Conservação Ambiental receipt comes only from an order with status Pago. Check the details before printing.",
        es: "El comprobante oficial de la Taxa de Conservação Ambiental sale solo de un pedido con estado Pago. Compruebe los datos antes de imprimir."
      },
      doneTipLabel: { pt: "Outros caminhos", en: "Other paths", es: "Otros caminos" },
      doneTipHtml: {
        pt: "Também dá para abrir em <b>Meus pedidos</b>, logo depois de pagar, ou em Consultar Recibo no site, com o código CT e o localizador do grupo.",
        en: "You can also open it in <b>Meus pedidos</b>, right after paying, or in Consultar Recibo on the website, with the CT code and the group locator.",
        es: "También se puede abrir en <b>Meus pedidos</b>, justo después de pagar, o en Consultar Recibo en el sitio, con el código CT y el localizador del grupo."
      },
      steps: [
        {
          title: { pt: "Abra a taxa ambiental", en: "Open the environmental fee", es: "Abra la tasa ambiental" },
          narrate: {
            pt: "Passo 1. Abra a taxa ambiental. No grupo, toque em Taxas e serviços. Depois toque em Taxa de Conservação Ambiental de Bonito.",
            en: "Step 1. Open the environmental fee. In the group, tap Taxas e serviços. Then tap Taxa de Conservação Ambiental de Bonito.",
            es: "Paso 1. Abra la tasa ambiental. En el grupo, toque Taxas e serviços. Luego toque Taxa de Conservação Ambiental de Bonito."
          },
          alt: {
            pt: "No grupo, o ponteiro toca em Taxas e serviços e na Taxa de Conservação Ambiental de Bonito.",
            en: "In the group, the pointer taps Taxas e serviços and Taxa de Conservação Ambiental de Bonito.",
            es: "En el grupo, el puntero toca Taxas e serviços y Taxa de Conservação Ambiental de Bonito."
          },
          howto: [
            { pt: "Entre no <b>grupo</b>.", en: "Go into the <b>grupo</b>.", es: "Entre en el <b>grupo</b>." },
            { pt: "Toque em <b>Taxas e serviços</b>.", en: "Tap <b>Taxas e serviços</b>.", es: "Toque <b>Taxas e serviços</b>." },
            { pt: "Toque em <b>Taxa de Conservação Ambiental de Bonito</b>.", en: "Tap <b>Taxa de Conservação Ambiental de Bonito</b>.", es: "Toque <b>Taxa de Conservação Ambiental de Bonito</b>." }
          ],
          tipLabel: { pt: "Antes de imprimir", en: "Before printing", es: "Antes de imprimir" },
          tipHtml: {
            pt: "Só pedido <b>Pago</b> gera o comprovante oficial da prefeitura.",
            en: "Only an order with status <b>Pago</b> generates the official city-hall receipt.",
            es: "Solo el pedido <b>Pago</b> genera el comprobante oficial de la prefectura."
          }
        },
        {
          title: { pt: "Abra o histórico", en: "Open the history", es: "Abra el historial" },
          narrate: {
            pt: "Passo 2. Abra o histórico. No alto da taxa ambiental, toque em Histórico. Depois toque no pedido com código CT e status Pago.",
            en: "Step 2. Open the history. At the top of the environmental fee, tap Histórico. Then tap the order with code CT and status Pago.",
            es: "Paso 2. Abra el historial. En la parte alta de la tasa ambiental, toque Histórico. Luego toque el pedido con código CT y estado Pago."
          },
          alt: {
            pt: "Na tela Histórico, o pedido CT119767 aparece com status Pago, no modo crédito.",
            en: "On the Histórico screen, order CT119767 appears with status Pago, in credit mode.",
            es: "En la pantalla Histórico, el pedido CT119767 aparece con estado Pago, en modo crédito."
          },
          howto: [
            { pt: "Toque em <b>Histórico</b>, no alto da taxa ambiental.", en: "Tap <b>Histórico</b>, at the top of the environmental fee.", es: "Toque <b>Histórico</b>, en la parte alta de la tasa ambiental." },
            { pt: "Toque no pedido com código <b>CT</b> e status <b>Pago</b>.", en: "Tap the order with code <b>CT</b> and status <b>Pago</b>.", es: "Toque el pedido con código <b>CT</b> y estado <b>Pago</b>." }
          ],
          tipLabel: { pt: "Se o Histórico não aparecer", en: "If Histórico does not appear", es: "Si Histórico no aparece" },
          tipHtml: {
            pt: "Dá para chegar na lista por Solicitar devolução e depois Solicitar devolução de pagamento.",
            en: "You can reach the list through Solicitar devolução and then Solicitar devolução de pagamento.",
            es: "Se puede llegar a la lista por Solicitar devolução y luego Solicitar devolução de pagamento."
          }
        },
        {
          title: { pt: "Toque em Imprimir comprovante", en: "Tap Imprimir comprovante", es: "Toque Imprimir comprovante" },
          narrate: {
            pt: "Passo 3. Toque em Imprimir comprovante. Na tela de detalhes do pagamento, toque em Imprimir comprovante, no canto inferior direito.",
            en: "Step 3. Tap Imprimir comprovante. On the payment details screen, tap Imprimir comprovante, in the lower-right corner.",
            es: "Paso 3. Toque Imprimir comprovante. En la pantalla de detalles del pago, toque Imprimir comprovante, en la esquina inferior derecha."
          },
          alt: {
            pt: "Nos detalhes do pagamento pago, o ponteiro toca em Imprimir Comprovante, no canto inferior direito.",
            en: "On the paid payment details, the pointer taps Imprimir Comprovante, in the lower-right corner.",
            es: "En los detalles del pago pagado, el puntero toca Imprimir Comprovante, en la esquina inferior derecha."
          },
          howto: [
            { pt: "Confira se o status está <b>Pago</b>.", en: "Check that the status is <b>Pago</b>.", es: "Compruebe que el estado está <b>Pago</b>." },
            { pt: "Toque em <b>Imprimir Comprovante</b>, no canto inferior direito.", en: "Tap <b>Imprimir Comprovante</b>, in the lower-right corner.", es: "Toque <b>Imprimir Comprovante</b>, en la esquina inferior derecha." }
          ],
          tipLabel: { pt: "Não confunda", en: "Do not mix them up", es: "No los confunda" },
          tipHtml: {
            pt: "O botão vermelho à esquerda é <b>Reembolso</b>. O comprovante é o verde, à direita.",
            en: "The red button on the left is <b>Reembolso</b>. The receipt is the green one on the right.",
            es: "El botón rojo a la izquierda es <b>Reembolso</b>. El comprobante es el verde, a la derecha."
          }
        },
        {
          title: { pt: "Imprima o recibo", en: "Print the receipt", es: "Imprima el recibo" },
          narrate: {
            pt: "Passo 4. Imprima o recibo. Confira código do pedido, localizador, valor, nome e o status pago. Toque em Imprimir e use a impressora ou salvar como PDF.",
            en: "Step 4. Print the receipt. Check the order code, locator, amount, name, and the paid status. Tap Imprimir and use the printer, or save as PDF.",
            es: "Paso 4. Imprima el recibo. Compruebe código del pedido, localizador, valor, nombre y el estado pago. Toque Imprimir y use la impresora, o guardar como PDF."
          },
          alt: {
            pt: "No recibo da taxa ambiental, o ponteiro toca no botão Imprimir, com o status pago.",
            en: "On the environmental-fee receipt, the pointer taps the Imprimir button, with status pago.",
            es: "En el recibo de la tasa ambiental, el puntero toca el botón Imprimir, con el estado pago."
          },
          howto: [
            { pt: "Confira código do pedido, localizador, valor, nome e status <b>pago</b>.", en: "Check the order code, locator, amount, name, and status <b>pago</b>.", es: "Compruebe código del pedido, localizador, valor, nombre y estado <b>pago</b>." },
            { pt: "Toque em <b>Imprimir</b>.", en: "Tap <b>Imprimir</b>.", es: "Toque <b>Imprimir</b>." },
            { pt: "Use a impressora ou <b>Salvar como PDF</b> do navegador.", en: "Use the printer or the browser’s <b>Salvar como PDF</b>.", es: "Use la impresora o <b>Salvar como PDF</b> del navegador." }
          ],
          tipLabel: { pt: "Se não estiver pago", en: "If it is not paid", es: "Si no está pagado" },
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

  function applyGuide(id) {
    const lang = getLang();
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
    GUIDES: GUIDES
  };
})();
