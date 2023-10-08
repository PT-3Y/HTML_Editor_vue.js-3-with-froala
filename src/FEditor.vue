<template>
  <div id="app">
    <froala id="edit" :tag="'textarea'" :config="config" v-model:value="model" ref="editor"></froala>
  </div>
</template>

<script>
// import "./components/common.js"
import 'froala-editor/js/plugins.pkgd.min.js';
// Import third-party plugins
import 'froala-editor/js/third_party/embedly.min';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/image_tui.min';
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import './components/insertInputBox';
import './components/insertCheckBox';
import './components/insertRadio';
import './components/insertSelectBox';
import './components/insertTimePicker';
import './components/edit';
import './components/popup';
import $ from "jquery"
import FroalaEditor from 'froala-editor';


export default {
  name: 'FEditor',
  data() {
    return {
      title :undefined,
      instance: undefined,
      config: {
        // inlineMode: false,
        documentReady: true,
        tabSpaces: true,

        // toolbarTabs:{
        //   buttons:['a','b']
        // },
        // pageSize: 'A4',
        toolbarButtons: [
          ['Edit', 'Design', 'ReadOnly', 'PageSize'],
          ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
          ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
          ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'], ['insertInput', 'insertCheckBox', 'insertRadio', 'insertSelectBox', 'insertTimePicker'],
          ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help', 'layout']
        ],
        // toolbarCustomButtons: ['pageSize'],
        events: {
          'froalaEditor.initialized': function () {
              console.log('initialized')
            },

          // initialized: this.setupPopup,
          contentChanged: function () {

            // this.commands.exec('insertCheckBox')
            // Content changed event
            console.log('Content changed');
          },
          click: function () {

          },
          blur: function () {
            // Editor blur event
            console.log('Editor blurred');
          }
        }
      },
      model: ''
    };
  },
  created() {

    // FroalaEditor.DefineIcon('pageSize', { NAME: 'pageSize'});
    
    FroalaEditor.RegisterCommand('PageSize', {
    icon: '&nbsp A4 &nbsp &nbsp',
    type: 'dropdown',
    focus: true,
    undo: true,
    // Tooltip
    title: 'PageSize',
    options: {
      'A4': 'A4 (210 x 297 mm)',
      'A5': 'A5 (148 x 210 mm)',
      'Letter': 'Letter (8.5 x 11 in)',
      'Legal': 'Legal (8.5 x 14 in)'
    },
    // Callback function
    callback: function (cmd, val) {
      // var vald = this.$tb.find('#pageSize-1').find('.fr-sr-only').innerHTML = val;

      this.$tb.find('#PageSize-1')[0].innerHTML = `&nbsp ${val}` + ' &nbsp &nbsp &nbsp';

      // Set the height and width of the editor according to the page size
      switch (val) {

        case 'A4':
          // this.opts.height = '1123px';
          this.opts.width = '794px';
          this.opts.pageSize = val;

          // FroalaEditor.DefineIcon('pageSize', { NAME: 'A4', SVG_KEY:'A4'});
          break;
        case 'A5':
          // this.opts.height = '1040px';
          console.log(this, 'here is width')
          this.opts.width = '559px';
          this.opts.pageSize = val;
          // FroalaEditor.DefineIcon('pageSize', { NAME: 'A5', SVG_KEY:'A5'});

          break;
        case 'Letter':
          // this.opts.height = '1056px';
          this.opts.width = '816px';
          this.opts.pageSize = val;

          // FroalaEditor.DefineIcon('pageSize', { NAME: 'Letter', SVG_KEY:'Letter' });

          break;
        case 'Legal':
          // this.opts.height = '1344px';
          this.opts.width = '816px';
          this.opts.pageSize = val;

          // FroalaEditor.DefineIcon('pageSize', { NAME: 'Legal',SVG_KEY:'Legal' });

          break;
      }
      // Refresh the editor size
      this.size.refresh();
    },
    // Dropdown menu
    refresh: function ($btn) {
      const instance = this;

      // console.log(instance.opts.PageSize, 'here is instance')

      // var selectedValue = editor.find('.fr-command[data-cmd="pageSize"]');
      // console.log(selectedValue,'here is selectedValue')
      var $dropdown = $btn.next();
      $dropdown.find('.fr-command').each(function () {
        var $this = $(this);
        // console.log('===================param1',$btn[0].children[1])

        // Add a check mark for the selected page size
        if ($this.attr('data-param1') == instance.opts.PageSize) {
          $this.prepend(`<i class="fa fa-check"></i>`);
        }
      })
    },
    // Dropdown content
    // dropdown: function () {
    //   console.log('dropdown event')
    //   var dropdown = {};
    //   dropdown['A4'] = 'A4 (210 x 297 mm)';
    //   dropdown['A5'] = 'A5 (148 x 210 mm)';
    //   dropdown['Letter'] = 'Letter (8.5 x 11 in)';
    //   dropdown['Legal'] = 'Legal (8.5 x 14 in)';
    //   return dropdown;
    // }

  });



    // this.showPopup = this.showPopup.bind(this);
  },

  beforeUnmount() {
    // this.instance = FroalaEditor('#edit');

    // this.instance.removeEventListener('mouseover', this.handleClick);
  },
  mounted() {

    const editorElement = this.$refs.editor.$el;
    console.log('hhahahah', this.config)
    editorElement.addEventListener('click', console.log('here is editorElement  '));
   

  },
  methods: {


    

    // handleClick(event) {
    //   console.log('here is handle click')
    //   const targetElement = event.target;
    //   // Add logic to determine if the clicked element is the specific element you want
    //   if (targetElement.classList.contains('tooltip')) {
    //     this.showPopup(targetElement);
    //   }
    // },
    // showPopup(targetElement) {


    //   const popupName = 'myPopup';
    //   // const this.instance = FroalaEditor('#edit');

    //   if (this.instance.popups.isVisible(popupName)) {
    //     this.instance.popups.hide(popupName);
    //   } else {
    //     const offset = targetElement.getBoundingClientRect();
    
    //     const left = offset.left + window.pageXOffset;
    //     const top = offset.top + offset.height + window.pageYOffset;
    //     console.log('here is positive condition', this.instance.popups, left, top)
    //     this.instance.popups.show(popupName, left, top);
    //   }
    // },
    // setupPopup() {
    //   const popupName = 'myPopup';
    //   // const editorInstance = this.$refs.editor.editor;

    //   if (!this.instance || !this.instance.popups) {
    //     console.error("Editor instance or popups object is undefined.");
    //     return;
    //   }

    //   this.instance.POPUP_TEMPLATES = {
    //     ...this.instance.POPUP_TEMPLATES,
    //     [popupName]: function () {
    //       const template = '<div >' +
    //         '<h3>Custom Popup</h3>' +
    //         '<p>This is a custom popup.</p>' +
    //         '</div>';
    //       console.log('template')
    //       return template;
    //     }
    //   };

    //   const popupButtons = {
    //     popupButton1: {
    //       title: 'Open Popup',
    //       icon: 'fa fa-cogs',
    //       undo: false,
    //       focus: false,
    //       callback: () => {
    //         this.showPopup();
    //       }
    //     }
    //   };

    //   this.instance.popups.create(popupName, popupButtons);
    // }

  }
}
</script>

<style>
/* Add any custom styles here */
</style>