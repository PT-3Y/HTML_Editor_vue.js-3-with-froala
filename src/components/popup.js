import FroalaEditor from 'froala-editor';
// import $ from "jquery"

FroalaEditor.POPUP_TEMPLATES["customPlugin.popup"] = '[_BUTTONS_][_CUSTOM_LAYER_]';

// Define popup buttons.
Object.assign(FroalaEditor.DEFAULTS, {
  popupButtons: ['Close', '|', 'EditModal', 'Remove'],
});

// The custom popup is defined inside a plugin (new or existing).
FroalaEditor.PLUGINS.customPlugin = function (editor) {

  editor.events.on('click', function () {

    // const clicktarget = evt.target
  })


  editor.events.on('mousemove', function (e) {
    showPopup(e.target);
  })

  editor.events.on('contentChanged', function () {

  })

  editor.events.on('blur', function () {

  })
  // Create custom popup.
  function initPopup(inputId, inputName) {
    // Popup buttons.
    var popup_buttons = '';

    // Create the list of buttons.
    if (editor.opts.popupButtons.length > 1) {
      popup_buttons += '<div class="fr-buttons">';
      popup_buttons += editor.button.buildList(editor.opts.popupButtons);
      popup_buttons += '</div>';
    }

    // Load popup template.
    var template = {
      buttons: popup_buttons,
      custom_layer: `<H3 class="custom-layer" style="text-align:center; margin:10px" contenteditable="false">${inputName}</H3>`
    };

    //   // Create popup.
    var $popup = editor.popups.create('customPlugin.popup', template);

    return $popup;
  }

  // // Show the popup
  function showPopup(e) {
    var target = e;

    if (typeof (target.className) !== 'string' || !target.className.includes('component'))
      return;
    if (target.className == 'undefined')
      return
    for (var index = 0; ; index++) {
      if (target.className.includes('parent'))
        break;
      else
        target = target.parentNode

    }
    const type = target.className.replace(' component parent', '')
    const inputId = target.getAttribute('id').replace('_component', '')
    const inputName = target.getAttribute('name')
    for (var item = 0; ; item++) {

      if (!target.className.includes('component parent'))
        target = target.parentNode;
      else
        break;
    }

    // Get the popup object defined above.
    var $popup = editor.popups.get('customPlugin.popup');

    // If popup doesn't exist then create it.
    // To improve performance it is best to create the popup when it is first needed
    // and not when the editor is initialized.
    if (!$popup) $popup = initPopup(inputId, inputName);

    // Set the editor toolbar as the popup's container.
    editor.popups.setContainer('customPlugin.popup', editor.$el);

    // This will trigger the refresh event assigned to the popup.
    editor.popups.refresh('customPlugin.popup');

    // This custom popup is opened by pressing a button from the editor's toolbar.
    // Get the button's object in order to place the popup relative to it.


    // var $btn = editor.$tb.find('.fr-command[data-cmd="myButton"]');


    var rect = target.getBoundingClientRect();

    var left = (rect.left + rect.width / 1.2)
    var top = rect.top + 20;

    sessionStorage.setItem("inputId", inputId);
    sessionStorage.setItem("inputName", inputName);
    sessionStorage.setItem("type", type);


    // Show the custom popup.
    // The button's outerHeight is required in case the popup needs to be displayed above it.
    editor.popups.show('customPlugin.popup', left, top, e.outerHeight);
  }

  // Hide the custom popup.
  function hidePopup() {
    editor.popups.hide('customPlugin.popup');
  }

  // Methods visible outside the plugin.
  return {
    showPopup: showPopup,
    hidePopup: hidePopup
  }
}


// Define custom popup close button icon and command.
FroalaEditor.DefineIcon('Close', { NAME: 'times', SVG_KEY: 'back' });
FroalaEditor.RegisterCommand('Close', {
  title: 'Close',
  undo: false,
  focus: false,
  callback: function () {

    this.customPlugin.hidePopup();
  }
});

// Define custom popup 1.
// FroalaEditor.DefineIcon('popupButton1', { NAME: 'bell-o', SVG_KEY: 'help' });
FroalaEditor.RegisterCommand('EditModal', {
  title: '编辑',
  undo: false,
  focus: false,
  icon: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 512 512" xml:space="preserve">
        <polygon style="fill:#81E3E2;" points="8.173,104.459 407.541,503.828 430.65,480.719 254.075,257.925 31.283,81.35 "/>
        <rect x="-14.837" y="192.704" transform="matrix(0.7071 0.7071 -0.7071 0.7071 251.2163 -117.5938)" style="fill:#ABECEC;" width="564.786" height="103.489"/>
        <polygon style="fill:#4D4D4D;" points="77.449,434.552 77.449,480.737 8.171,503.831 "/>
        <polygon style="fill:#737373;" points="31.263,434.552 71.675,428.779 65.903,469.191 8.171,503.831 "/>
        <polygon style="fill:#FFC1A6;" points="135.181,399.913 146.727,457.645 77.449,480.737 65.903,469.191 "/>
        <polygon style="fill:#FFDBCC;" points="54.355,365.274 149.376,362.624 123.635,434.552 65.903,469.191 31.263,434.552 "/>
        <polygon style="fill:#FEDC3D;" points="401.934,125.462 417.329,187.043 146.727,457.645 123.635,434.552 "/>
        <path style="fill:#FE5F1A;" d="M386.538,125.462l61.581,30.791l46.186-46.186c12.701-12.701,12.701-33.485,0-46.186l-23.092-23.092
        L386.538,125.462z"/>
        <polygon style="fill:#FFF1B1;" points="54.355,365.274 100.541,411.459 137.491,402.222 408.093,131.62 324.958,94.671 "/>
        <rect x="242.603" y="68.495" transform="matrix(0.7071 0.7071 -0.7071 0.7071 271.1167 -102.2059)" style="fill:#FFE777;" width="32.658" height="415.338"/>
        <path style="fill:#FE834D;" d="M448.12,17.696l23.092,23.092c12.701,12.701,12.701,33.485,0,46.186l-61.581,61.581L355.749,63.88
        l46.186-46.186C414.635,4.995,435.418,4.995,448.12,17.696z"/>
        <rect x="404.846" y="138.337" transform="matrix(0.7071 0.7071 -0.7071 0.7071 236.5733 -250.9207)" style="fill:#DCDCDC;" width="32.658" height="43.544"/>
        <rect x="326.008" y="92.15" transform="matrix(0.7071 0.7071 -0.7071 0.7071 190.3887 -231.7955)" style="fill:#FFFFFF;" width="97.976" height="43.544"/>
        <path d="M417.509,309.667c-0.002-0.002-55.625-55.625-55.625-55.625l92.008-92.008c0.009-0.009,46.19-46.19,46.19-46.19
        c7.685-7.685,11.918-17.939,11.918-28.869c0-10.932-4.233-21.185-11.918-28.87l-46.185-46.186C446.211,4.233,435.957,0,425.027,0
        c-10.932,0-21.185,4.232-28.871,11.919L257.959,150.115L110.238,2.396c-3.192-3.191-8.364-3.191-11.555,0L2.396,98.682
        c-3.191,3.191-3.191,8.364,0,11.554l130.389,130.389c1.596,1.595,3.688,2.393,5.778,2.393s4.182-0.797,5.778-2.393
        c3.191-3.191,3.191-8.364,0-11.554L19.728,104.459l11.554-11.554l124.612,124.611c1.596,1.595,3.688,2.393,5.778,2.393
        c2.09,0,4.182-0.797,5.778-2.393c3.191-3.191,3.191-8.364,0-11.554L42.836,81.35l61.623-61.624l19.142,19.142L106.27,56.201
        c-3.191,3.191-3.191,8.364,0,11.554c1.596,1.595,3.687,2.393,5.778,2.393c2.09,0,4.182-0.797,5.778-2.393l17.332-17.332
        l19.147,19.147l-17.332,17.332c-3.192,3.191-3.192,8.363-0.001,11.554c1.596,1.596,3.686,2.393,5.778,2.393
        c2.09,0,4.182-0.797,5.777-2.393l17.333-17.332l19.146,19.146l-17.333,17.333c-3.191,3.191-3.191,8.364,0,11.554
        c1.596,1.596,3.686,2.393,5.778,2.393c2.09,0,4.182-0.797,5.778-2.393l17.332-17.332l19.146,19.146l-17.332,17.333
        c-3.191,3.191-3.191,8.364,0,11.554c1.596,1.595,3.687,2.393,5.778,2.393s4.182-0.797,5.778-2.393l17.332-17.332l19.146,19.146
        L48.579,359.496c-0.216,0.216-0.415,0.442-0.601,0.675c-0.047,0.058-0.087,0.121-0.132,0.18c-0.138,0.183-0.27,0.367-0.391,0.559
        c-0.045,0.071-0.085,0.145-0.129,0.217c-0.111,0.188-0.216,0.38-0.31,0.575c-0.038,0.077-0.073,0.155-0.109,0.233
        c-0.09,0.202-0.171,0.404-0.244,0.611c-0.017,0.049-0.041,0.095-0.058,0.144L0.42,501.246c-0.978,2.936-0.215,6.172,1.974,8.361
        C3.952,511.164,6.04,512,8.173,512c0.864,0,1.736-0.137,2.583-0.419l138.556-46.186c0.053-0.017,0.102-0.044,0.156-0.062
        c0.199-0.071,0.395-0.149,0.59-0.235c0.084-0.037,0.167-0.075,0.249-0.115c0.19-0.093,0.376-0.194,0.56-0.303
        c0.076-0.045,0.154-0.088,0.229-0.135c0.187-0.119,0.368-0.248,0.547-0.383c0.063-0.047,0.129-0.09,0.19-0.139
        c0.232-0.186,0.459-0.385,0.674-0.6l197.824-197.824l19.146,19.146l-17.332,17.332c-3.191,3.191-3.191,8.364,0,11.554
        c1.596,1.595,3.688,2.393,5.778,2.393s4.182-0.797,5.778-2.393l17.332-17.332l19.146,19.146l-17.333,17.332
        c-3.191,3.191-3.191,8.364,0,11.554c1.596,1.596,3.686,2.393,5.778,2.393c2.09,0,4.182-0.797,5.778-2.393l17.332-17.332
        l19.146,19.146l-17.332,17.332c-3.192,3.191-3.192,8.363-0.001,11.554c1.596,1.596,3.686,2.393,5.778,2.393
        c2.09,0,4.182-0.797,5.777-2.393l17.333-17.332l19.147,19.146l-17.332,17.333c-3.191,3.191-3.191,8.364,0,11.554
        c1.596,1.595,3.688,2.393,5.778,2.393c2.09,0,4.182-0.797,5.778-2.393l17.332-17.332l19.143,19.142l-61.624,61.624L306.043,344.549
        c-3.192-3.191-8.364-3.191-11.555,0s-3.191,8.364,0,11.554l124.612,124.612l-11.554,11.554L282.929,367.66
        c-3.194-3.192-8.366-3.19-11.555,0c-3.191,3.191-3.191,8.364,0,11.554l130.389,130.39c1.596,1.596,3.686,2.393,5.778,2.393
        c2.091,0,4.182-0.797,5.778-2.393l96.288-96.287c1.532-1.532,2.392-3.61,2.392-5.777c0-2.167-0.861-4.245-2.392-5.777
        L417.509,309.667z M146.728,446.089l-80.817-80.817l259.045-259.046l34.632,34.631L117.858,382.589
        c-3.191,3.191-3.191,8.364,0,11.554c1.596,1.595,3.688,2.393,5.778,2.393c2.09,0,4.182-0.797,5.778-2.393l241.73-241.73
        l17.315,17.315c1.596,1.595,3.688,2.393,5.778,2.393s4.182-0.797,5.778-2.393c3.191-3.191,3.191-8.364,0-11.554l-23.091-23.091
        c-0.003-0.003-40.411-40.411-40.411-40.411l19.236-19.236l80.817,80.817L146.728,446.089z M79.656,471.39l-39.044-39.045
        l17.315-51.946l73.676,73.676L79.656,471.39z M407.71,23.473c4.599-4.599,10.75-7.132,17.317-7.132
        c6.566,0,12.716,2.533,17.315,7.132l46.185,46.186c9.548,9.548,9.548,25.084,0,34.632l-40.408,40.408l-80.817-80.817L407.71,23.473z
        M34.835,449.676l27.489,27.49L21.09,490.911L34.835,449.676z"/>
        </svg>`,
  callback: function () {
    const type = sessionStorage.getItem('type');

    switch (type) {
      case 'input':
        this.commands.exec('inputModal',{parameter:'here is parameter'})
        break;
      case 'check':
        this.commands.exec('checkboxModal')
        break;

      case 'radio':
        this.commands.exec('radioModal');
        break;
      case 'select':
        this.commands.exec('selectboxModal');
        break;

      case 'time':
        this.commands.exec('timeModal');
        break;
    }

  }
});

// Define custom popup 2.
// FroalaEditor.DefineIcon('popupButton2', { NAME: 'bullhorn', SVG_KEY: 'cogs' });
FroalaEditor.RegisterCommand('Remove', {
  title: '删除',
  undo: false,
  focus: false,
  icon: `<svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
  viewBox="0 0 512 512" xml:space="preserve">
<path style="fill:#77757F;" d="M395.636,93.091h-46.545h-23.273V23.273C325.818,10.42,315.398,0,302.545,0h-93.091h-93.091
 c-12.853,0-23.273,10.42-23.273,23.273v69.818H69.818H23.273C10.42,93.091,0,103.511,0,116.364s10.42,23.273,23.273,23.273h23.273
 v287.03c0,12.853,10.42,23.273,23.273,23.273h93.091h46.545h11.785c-1.285-1.624-2.529-3.285-3.752-4.959
 c-0.386-0.529-0.765-1.066-1.145-1.6c-0.853-1.198-1.69-2.408-2.51-3.629c-0.391-0.582-0.785-1.16-1.17-1.747
 c-1.095-1.674-2.169-3.365-3.204-5.081c-0.002-0.002-0.002-0.003-0.003-0.005V265.278c6.582-10.92,14.401-21.012,23.273-30.075
 c4.861-4.966,10.031-9.627,15.487-13.943c2.535-2.005,5.134-3.928,7.786-5.783c7.34-5.131,15.12-9.672,23.273-13.557
 c14.473-6.893,30.118-11.709,46.545-14.069c7.602-1.092,15.371-1.669,23.273-1.669c7.902,0,15.67,0.577,23.273,1.669v-48.215h23.273
 c12.853,0,23.273-10.42,23.273-23.273C418.909,103.511,408.489,93.091,395.636,93.091z M256,93.091h-46.545h-46.545h-23.273V46.545
 h69.818h69.818v46.545H256z"/>
<g>
 <polygon style="fill:#C3C3C7;" points="93.091,139.636 93.091,403.394 139.636,403.394 139.636,139.636 116.364,139.636 	"/>
 <path style="fill:#C3C3C7;" d="M195.5,403.394c-6.028-16.994-9.318-35.269-9.318-54.303v54.303H195.5z"/>
</g>
<g>
 <path style="fill:#A9A8AE;" d="M186.182,139.636v209.455c0-44.286,17.77-84.492,46.545-113.887v-95.567H186.182z"/>
 <path style="fill:#A9A8AE;" d="M302.545,139.636h-23.273v62.286c14.473-6.893,30.118-11.709,46.545-14.069v-48.216H302.545z"/>
</g>
<path style="fill:#87868D;" d="M221.24,449.939c-4.274-5.407-8.212-11.092-11.785-17.02v17.02H221.24z"/>
<g>
 <polygon style="fill:#77757F;" points="93.091,139.636 93.091,403.394 139.636,403.394 139.636,139.636 116.364,139.636 	"/>
 <path style="fill:#77757F;" d="M186.182,349.091v54.303h9.318c2.861,8.065,6.327,15.846,10.367,23.273
   c1.15,2.115,2.349,4.197,3.589,6.253V139.636h-23.273v209.455H186.182z"/>
</g>
<path style="fill:#57575C;" d="M162.909,93.091h-23.273V46.545h69.818V0h-93.091c-12.853,0-23.273,10.42-23.273,23.273v69.818
 H69.818H23.273C10.42,93.091,0,103.511,0,116.364s10.42,23.273,23.273,23.273h23.273v287.03c0,12.853,10.42,23.273,23.273,23.273
 h93.091h46.545v-17.02c-1.24-2.056-2.439-4.139-3.589-6.253c-4.04-7.427-7.506-15.208-10.367-23.273h-9.317v-54.303V139.636h23.273
 V93.091H162.909z M139.636,403.394H93.091V139.636h23.273h23.273V403.394z"/>
<path style="fill:#D8143A;" d="M372.364,187.851c-7.602-1.092-15.371-1.669-23.273-1.669c-7.902,0-15.67,0.577-23.273,1.669
 c-16.427,2.36-32.073,7.176-46.545,14.069c-8.153,3.883-15.932,8.426-23.273,13.557c-2.652,1.854-5.25,3.779-7.786,5.783
 c-5.458,4.316-10.628,8.977-15.487,13.943c-28.776,29.395-46.545,69.601-46.545,113.887c0,19.034,3.291,37.309,9.318,54.303
 c2.861,8.065,6.327,15.846,10.367,23.273c4.464,8.208,9.615,15.99,15.372,23.273C251.1,487.714,297.312,512,349.091,512
 C438.919,512,512,438.919,512,349.091C512,267.163,451.205,199.179,372.364,187.851z M398.459,365.546
 c9.089,9.089,9.089,23.824,0,32.912c-4.544,4.544-10.501,6.817-16.455,6.817s-11.913-2.271-16.457-6.817l-16.455-16.455
 l-16.455,16.455c-4.544,4.544-10.501,6.817-16.457,6.817c-5.956,0-11.913-2.271-16.455-6.817c-9.089-9.089-9.089-23.824,0-32.912
 l16.455-16.455l-16.455-16.455c-9.089-9.089-9.089-23.824,0-32.912c9.087-9.089,23.824-9.089,32.912,0l16.455,16.455l16.455-16.455
 c9.087-9.089,23.824-9.089,32.912,0s9.089,23.824,0,32.912l-16.455,16.455L398.459,365.546z"/>
<path style="fill:#B8002B;" d="M332.636,398.459c-4.544,4.544-10.501,6.817-16.455,6.817c-5.956,0-11.913-2.271-16.455-6.817
 c-9.089-9.089-9.089-23.824,0-32.912l16.454-16.455l-16.455-16.455c-9.089-9.089-9.089-23.824,0-32.912
 c9.087-9.089,23.824-9.089,32.912,0l16.455,16.455V186.182c-7.902,0-15.67,0.577-23.273,1.669
 c-16.427,2.36-32.073,7.176-46.545,14.069c-8.153,3.883-15.932,8.426-23.273,13.557c-2.652,1.854-5.25,3.779-7.786,5.783
 c-5.458,4.316-10.628,8.977-15.487,13.943c-28.776,29.395-46.545,69.601-46.545,113.887c0,19.034,3.291,37.309,9.318,54.303
 c2.861,8.065,6.327,15.846,10.367,23.273c4.464,8.208,9.615,15.99,15.372,23.273C251.1,487.714,297.312,512,349.091,512V382.003
 L332.636,398.459z"/>
<path style="fill:#70001E;" d="M299.723,299.723c-9.089,9.089-9.089,23.824,0,32.912l16.455,16.455l-16.455,16.455
 c-9.089,9.089-9.089,23.824,0,32.912c4.544,4.544,10.501,6.817,16.455,6.817c5.956,0,11.913-2.271,16.455-6.817l16.457-16.455
 l16.455,16.455c4.544,4.544,10.501,6.817,16.455,6.817c5.956,0,11.913-2.271,16.455-6.817c9.089-9.089,9.089-23.824,0-32.912
 l-16.454-16.455l16.455-16.455c9.089-9.089,9.089-23.824,0-32.912c-9.087-9.089-23.824-9.089-32.912,0l-16.455,16.455
 l-16.455-16.455C323.547,290.634,308.81,290.634,299.723,299.723z"/>
</svg>`,
  callback: function () {
    const inputId = sessionStorage.getItem('inputId');
    var removeTarget = document.getElementById(`${inputId}_component`)
    removeTarget.remove();
    this.commands.exec('Close');
  }
});

// Initialize the editor.
