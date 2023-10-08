
import FroalaEditor from 'froala-editor';
import { checkId } from '../sheet/ids'
// // import $ from 'jquery'

console.log(FroalaEditor,' here is froala editor area')
FroalaEditor.DefineIcon('insertInput', { NAME: 'insertInput', SVG_KEY: 'star' });
FroalaEditor.RegisterCommand('insertInput', {
  title: 'insertInput',
  focus: true,
  undo: true,
  refreshAfterCallback: false,
  icon: `<svg  viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path fill="#444" d="M16 5c0-0.6-0.4-1-1-1h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6zM15 11h-14v-6h14v6z"></path>
  <path fill="#444" d="M2 6h1v4h-1v-4z"></path>
  </svg>`, // Use the custom icon here

  callback: function () {
    sessionStorage.setItem('inputId', undefined);
    this.commands.exec('inputModal', { inputId: 'foo' });
  }

});

FroalaEditor.RegisterCommand('inputModal', {
  title: 'Input Modal',
  focus: false,
  undo: false,
  refreshAfterCallback: false,
  callback: function (cmd, param) {
    console.log(param, 'here is param','cmd=-========',cmd)
    // Create a modal template with some HTML content
    var modal_body =
      `<div style="padding:20px">
    
    <div class="content">
    <div class="table-container">
      <table class="table oak-table">
        <tr>
          <th>
            <span>控件名称</span><span class="label label-important">*</span>
          </th>
          <th><span>控件ID</span></th>
          <th><span>默认值</span></th>
        </tr>
        <tr>
          <td><input type="text" id="orgname" required placeholder="必填项" /></td>
          <td><input type="text" id="inputId" required placeholder="可选项" /></td>
          <td><input type="text" id="defaultVal" required placeholder="可选项" /></td>
        </tr>
        <tr>
          <th><span>数据类型</span></th>
          <th><span>正则表达式</span></th>
          <th><span>对齐方式</span></th>
        </tr>
        <tr>
          <td>
            <select id="textType">
              <option value="普通文本">普通文本</option>
              <option value="数字">数字</option>
              <option value="身份证号">身份证号</option>
            </select>
          </td>
          <td>
            <input type="text" id="regnex" placeholder="自定义正则表达式" />
          </td>
          <td>
            <select id="textAlign">
              <option value="left">居左对齐</option>
              <option value="center">居中对齐</option>
              <option value="right">居右对齐</option>
            </select>
          </td>
        </tr>
        <tr>
          <th><span>取值</span></th>
          <th><span>显示条件</span></th>
        </tr>
        <tr>
          <td>
            <input type='text' id="value_regular" placeholder="type sentence" />
          </td>
          <td>
            <input type="text" id="display_regular" placeholder="type sentence" />
          </td>
        </tr>
        <tr>
          <th><span>字体颜色</span></th>
          <th colspan="2"><span> 最小宽度 & 字体大小</span></th>
        </tr>
        <tr>
          <td><input type="color" id="color" value="#3c3c3c" /></td>
          <td colspan="2">
            <input type="text" id="width" value="100" style="width: 40px;" />px &
            <input type="text" id="fontSize" value="16" style="width: 40px;" />px
          </td>
        </tr>
      </table>
      </div>
    </div>
    <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
      <button class="okButton">确定</button>
      <button class="cancelButton">取消</button>
    </div>
    </div>`;
    var inputId = sessionStorage.getItem('inputId')
    var originId = inputId;

    // Create the modal using the template
    this.modals.create('inputModal', `<div class="modal-header"><h3 class="modal-title">插入文本域输入</h3></div>`, modal_body);

    // If inputId is not undefined It is that is clicekd edit button on tooltip
    if (inputId != 'undefined') {
      this.modals.get('inputModal').$body[0].innerHTML = modal_body
      const inputComponent = document.getElementById(inputId)
      const inputName = inputComponent.getAttribute('name');
      const defaultVal = inputComponent.getAttribute('data-defaultVal');
      const regnex = inputComponent.getAttribute('data-regnex');
      const textType = inputComponent.getAttribute('data-textType')
      const value_regular = inputComponent.getAttribute('data-value_regular')
      const display_regular = inputComponent.getAttribute('data-display_regular')
      const textAlign = inputComponent.style.textAlign;
      const textColor = inputComponent.style.color;
      const minWidth = inputComponent.style.width;
      const fontSize = inputComponent.style.fontSize;

      this.modals.get('inputModal').$body.find('#orgname')[0].value = inputName;
      this.modals.get('inputModal').$body.find('#inputId')[0].value = inputId;
      this.modals.get('inputModal').$body.find('#defaultVal')[0].value = defaultVal;
      this.modals.get('inputModal').$body.find('#textAlign')[0].value = textAlign;
      this.modals.get('inputModal').$body.find('#regnex')[0].value = regnex;
      this.modals.get('inputModal').$body.find('#color')[0].value = textColor;
      this.modals.get('inputModal').$body.find('#width')[0].value = minWidth;
      this.modals.get('inputModal').$body.find('#textType')[0].value = textType;
      this.modals.get('inputModal').$body.find('#fontSize')[0].value = fontSize;
      this.modals.get('inputModal').$body.find('#value_regular')[0].value = value_regular;
      this.modals.get('inputModal').$body.find('#display_regular')[0].value = display_regular;

    } else {
      this.modals.get('inputModal').$body[0].innerHTML = modal_body
      this.modals.get('inputModal').$body.find('#orgname')[0].value = '';
      this.modals.get('inputModal').$body.find('#inputId')[0].value = '';
      this.modals.get('inputModal').$body.find('#defaultVal')[0].value = '';
      this.modals.get('inputModal').$body.find('#textAlign')[0].value = '';
      this.modals.get('inputModal').$body.find('#regnex')[0].value = '';
      this.modals.get('inputModal').$body.find('#color')[0].value = '';
      this.modals.get('inputModal').$body.find('#width')[0].value = '';
      this.modals.get('inputModal').$body.find('#textType')[0].value = '';
      this.modals.get('inputModal').$body.find('#fontSize')[0].value = '';
      this.modals.get('inputModal').$body.find('#value_regular')[0].value = '';
      this.modals.get('inputModal').$body.find('#display_regular')[0].value = '';


    }


    this.modals.show('inputModal');


    // Add event listeners to the buttons
    const okButton = this.modals.get('inputModal').$body.find('.okButton')[0];
    okButton.addEventListener('click', () => {
      // Get input values from the modal

      const inputName = this.modals.get('inputModal').$body.find('#orgname')[0].value;
      const inputId = this.modals.get('inputModal').$body.find('#inputId')[0].value;
      const defaultVal = this.modals.get('inputModal').$body.find('#defaultVal')[0].value;
      const textAlign = this.modals.get('inputModal').$body.find('#textAlign')[0].value;
      const regnex = this.modals.get('inputModal').$body.find('#regnex')[0].value;
      const textColor = this.modals.get('inputModal').$body.find('#color')[0].value;
      const minWidth = this.modals.get('inputModal').$body.find('#width')[0].value;
      const textType = this.modals.get('inputModal').$body.find('#textType')[0].value;
      const fontSize = this.modals.get('inputModal').$body.find('#fontSize')[0].value;
      const value_regular = this.modals.get('inputModal').$body.find('#value_regular')[0].value;
      const display_regular = this.modals.get('inputModal').$body.find('#display_regular')[0].value;

      var alldata = this.html.get()
      var condition = checkId(alldata, inputId, originId)

      if (!inputName || !inputId || !defaultVal) {
        window.alert('Some fields must be required')
        return
      }
      if (condition) {
        window.alert('There is same id')
        return
      }

      // get tooltip
      const parentComponent = document.getElementById(`${originId}_component`)

      // Generate the HTML string for the inserted input field
      if (parentComponent !== null) {
        const inputField = `
         <input type="text"
         class="component"
         type="text"
         name="${inputName}" 
         id="${inputId}" 
         value="${defaultVal}"
         style="color: ${textColor}; width: ${minWidth}; font-size: ${fontSize}; text-align: ${textAlign};"
         data-regnex = "${regnex}"
         data-defaultVal = "${defaultVal}" 
         data-value_regular = "${value_regular}"
         data-display_regular = "${display_regular}"
         data-textType = "${textType}" />
    `;
        parentComponent.setAttribute('id', `${inputId}_component`)
        parentComponent.setAttribute('name', `${inputId}`)

        parentComponent.innerHTML = inputField;

      } else {
        const inputField = `
              <span  class="input component parent" name = ${inputName} id = "${inputId}_component">
                <input type="text"
                class="component"
                type="text"
                name="${inputName}" 
                id="${inputId}" 
                value="${defaultVal}"
                style="color: ${textColor}; width: ${minWidth}; font-size: ${fontSize}; text-align: ${textAlign};"
                data-regnex = "${regnex}"
                data-defaultVal = "${defaultVal}" 
                data-value_regular = "${value_regular}"
                data-display_regular = "${display_regular}"
                data-textType = "${textType}" />
              <span>
          `;

        this.html.insert(inputField);
      }
      this.modals.hide('inputModal');

    });


    // this.modals.get('inputModal').$body.find('.okButton')[0]
    const cancelButton = this.modals.get('inputModal').$body.find('.cancelButton')[0];
    console.log(cancelButton, 'here is close button')

    // Add event listener to the close button
    cancelButton.addEventListener('mouseenter', () => {
      cancelButton.style.backgroundColor = 'rgb(210, 210, 210)'; // Change the background color on mouse enter
    });
    cancelButton.addEventListener('mouseleave', () => {
      cancelButton.style.backgroundColor = 'transparent'; // Change the background color back on mouse leave
    });

    const tableContainer = this.modals.get('inputModal').$body.find('.table-container')[0];
    console.log(tableContainer, '==tablecontainer')
    tableContainer.classList.add('scrollable-table');

    // Add event listener to the close button
    cancelButton.addEventListener('click', () => {
      this.modals.hide('inputModal');

    });

    // Add event listener to the ok button
    okButton.addEventListener('mouseenter', () => {
      okButton.style.backgroundColor = 'rgb(210, 210, 210)'; // Change the background color on mouse enter
    });
    okButton.addEventListener('mouseleave', () => {
      okButton.style.backgroundColor = 'transparent'; // Change the background color back on mouse leave
    });

    // Set the modal z-index to a higher value than the editor
    this.$box.find('.fr-modal-custom').css('z-index', this.opts.zIndex + 2);
  }
});


