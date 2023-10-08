import FroalaEditor from 'froala-editor';
import { checkId } from '../sheet/ids'

// let ids = [];


FroalaEditor.DefineIcon('insertCheckBox', { NAME: 'insertCheckBox', SVG_KEY: 'star' });
FroalaEditor.RegisterCommand('insertCheckBox', {
     title: 'insertCheckBox',
     focus: true,
     undo: true,
     refreshAfterCallback: false,
     icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 20.75H6C5.27065 20.75 4.57118 20.4603 4.05546 19.9445C3.53973 19.4288 3.25 18.7293 3.25 18V6C3.25 5.27065 3.53973 4.57118 4.05546 4.05546C4.57118 3.53973 5.27065 3.25 6 3.25H14.86C15.0589 3.25 15.2497 3.32902 15.3903 3.46967C15.531 3.61032 15.61 3.80109 15.61 4C15.61 4.19891 15.531 4.38968 15.3903 4.53033C15.2497 4.67098 15.0589 4.75 14.86 4.75H6C5.66848 4.75 5.35054 4.8817 5.11612 5.11612C4.8817 5.35054 4.75 5.66848 4.75 6V18C4.75 18.3315 4.8817 18.6495 5.11612 18.8839C5.35054 19.1183 5.66848 19.25 6 19.25H18C18.3315 19.25 18.6495 19.1183 18.8839 18.8839C19.1183 18.6495 19.25 18.3315 19.25 18V10.29C19.25 10.0911 19.329 9.90032 19.4697 9.75967C19.6103 9.61902 19.8011 9.54 20 9.54C20.1989 9.54 20.3897 9.61902 20.5303 9.75967C20.671 9.90032 20.75 10.0911 20.75 10.29V18C20.75 18.7293 20.4603 19.4288 19.9445 19.9445C19.4288 20.4603 18.7293 20.75 18 20.75Z" fill="#000000"/>
  <path d="M10.5 15.25C10.3071 15.2352 10.1276 15.1455 10 15L7.00001 12C6.93317 11.86 6.91136 11.7028 6.93759 11.5499C6.96382 11.3971 7.03679 11.2561 7.14646 11.1464C7.25613 11.0368 7.3971 10.9638 7.54996 10.9376C7.70282 10.9113 7.86006 10.9331 8.00001 11L10.47 13.47L19 4.99998C19.14 4.93314 19.2972 4.91133 19.4501 4.93756C19.6029 4.96379 19.7439 5.03676 19.8536 5.14643C19.9632 5.2561 20.0362 5.39707 20.0624 5.54993C20.0887 5.70279 20.0669 5.86003 20 5.99998L11 15C10.8724 15.1455 10.693 15.2352 10.5 15.25Z" fill="#000000"/>
  </svg>`, // Use the custom icon here

     callback: function () {
          sessionStorage.setItem('inputId', undefined);
          this.commands.exec('checkboxModal');
     }
});

FroalaEditor.DefineIcon('checkboxModal', { NAME: 'checkboxModal', });
FroalaEditor.RegisterCommand('checkboxModal', {
     title: 'Insert CheckBox',
     focus: true,
     undo: true,
     refreshAfterCallback: false,
     // Use the custom icon here
     callback: function () {
          // Create and display a new modal window
          var modal_body = `
               <div style="padding:20px">
                    <button class="close-button">X</button>
                    <div class="content">
                    <div class="table-container">
                         <table class="table oak-table">
                              <tr>
                              <th>
                                   <span>控件名称</span><span class="label label-important">*</span>
                              </th>
                              <th><span>控件ID</span></th>
                              <th><span>排列方式</span></th>
                              </tr>
                              <tr>
                              <td><input type="text" id="orgname" placeholder="必填项" /></td>
                              <td><input type="text" id="inputId" placeholder="可选项"/></td>
                              <td>
                                   <label><input type="radio" name="orient" id="horizontal" value="horizontal" checked="checked" />横排</label>
                                   <label><input type="radio" name="orient" id="vertical" value="vertical" />竖排</label>
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
                         </table>
                         <div class="oak-tab">
                              <ul class="oak-tab-list">
                              <li class="item active">固定选项</li>
                              <li class="item">动态数据</li>
                              </ul>
                              <div class="oak-tab-content">
                              <div id="fixed" class="content active">
                                   <div class="foot-btn">
                                   <button class="btn primray" id="add-option" >
                                   添加选项
                                   </button>
                                   </div>
                                   <table id="options_table" class="table oak-table">
                                   <tr> 
                                   <th width="50px"><span>选中</span></th>
                                   <th><span>选项值</span></th>
                                   <th width="130px"><span>操作</span></th>
                                   </tr>
                                   </table>
                              </div>
                              <div id="dynamic" class="content">
                                   <input type="text" placeholder="支持get请求的完整url地址（http://）" style="width: 90%;" id="url" />
                                   <div class="alert alert-info">
                                   <h4>提示：</h4>
                                   <ol>
                                   <li>
                                        1.如url中的值不为空此时不关注固定选项中有没有值，优先取地址中的值；
                                   </li>
                                   <li>
                                        2.地址中的json格式如下：<br />[{VALUE:'',TEXT:'',SELECTED:true/false}]<br />其中SELECTED=false未选中，SELECTED=true已选中
                                   </li>
                                   </ol>
                                   </div>
                              </div>
                              </div>
                         </div>
                    </div>
                    </div>
                    <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
                         <button class="okButton">确定</button>
                         <button class="cancelButton">取消</button>
                    </div>
               </div> 
               `;
          var inputId = sessionStorage.getItem('inputId')
          var originId = inputId
          this.modals.create('checkboxModal', `<div class="modal-header"><h3 class="modal-title">插入复选框</h3></div>`, modal_body);

          // Show the modal
          if (inputId != 'undefined') {
               this.modals.get('checkboxModal').$body[0].innerHTML = modal_body
               const checkComponent = document.getElementById(`${originId}_component`).querySelectorAll(`input[id="${inputId}"]`)[0]
               const inputName = checkComponent.getAttribute('name');
               const isVertical = checkComponent.getAttribute('data-isVertical');
               const value_regular = checkComponent.getAttribute('data-value_regular')
               const display_regular = checkComponent.getAttribute('data-display_regular')
               const optionsVal = document.getElementById(`${originId}_component`).querySelectorAll(`input[id="${inputId}"]`);
               const optionsTable = this.modals.get('checkboxModal').$body.find('#options_table')[0]
               console.log(optionsTable,'here is optionTable')


               optionsVal.forEach((field) => {
                    if (field) {
                       
                         var label = field.parentNode.children[1].innerText
                         console.log(label, 'here i===============================================s label',field.checked)

                         const newRow = document.createElement('tr');
                         newRow.innerHTML = `
                         <td><input type="checkbox" ${field.checked?'checked':""}></td>
                         <td><input type="text" value="${label}"></td>
                         <td><span class="btn-group clrfix"><button class="btn move-down">下移</button> <button class="btn move-up">上移</button> <button class="btn delete-option">删除</button></td>
                         `;
                         optionsTable.appendChild(newRow);
                    }
               });



               this.modals.get('checkboxModal').$body.find('#orgname')[0].value = inputName;
               this.modals.get('checkboxModal').$body.find('#inputId')[0].value = inputId;
               this.modals.get('checkboxModal').$body.find('#vertical')[0].checked = isVertical;
               this.modals.get('checkboxModal').$body.find('#horizontal')[0].checked = isVertical;
               // this.modals.get('checkboxModal').$body.find('#isVertical')[0].checked;
               // this.modals.get('checkboxModal').$body.find('#isVertical')[0].checked = isVertical;
               this.modals.get('checkboxModal').$body.find('#value_regular')[0].value = value_regular;
               this.modals.get('checkboxModal').$body.find('#display_regular')[0].value = display_regular;

          } else {
               this.modals.get('checkboxModal').$body[0].innerHTML = modal_body
               this.modals.get('checkboxModal').$body.find('#orgname')[0].value = '';
               this.modals.get('checkboxModal').$body.find('#inputId')[0].value = '';
               this.modals.get('checkboxModal').$body.find('#horizontal')[0].checked = true;
               this.modals.get('checkboxModal').$body.find('#vertical')[0].checked = false;
               this.modals.get('checkboxModal').$body.find('#value_regular')[0].value = '';
               this.modals.get('checkboxModal').$body.find('#display_regular')[0].value = '';
               this.modals.get('checkboxModal').$body.find('#options_table')[0].innerHTML = ''
          }
          this.modals.show('checkboxModal')

          const optionsTable = this.modals.get('checkboxModal').$body.find('#options_table')[0]
          // const optionsTable = modal.querySelector('#options_table');
          const fnAdd = () => {
               console.log("input Id I want", document.getElementById('inputId').value);
               const newRow = document.createElement('tr');
               newRow.innerHTML = `
          <td><input type="checkbox"></td>
          <td><input type="text" id="defaultValue"></td>
          <td><span class="btn-group clrfix"><button class="btn move-down">下移</button> <button class="btn move-up">上移</button> <button class="btn delete-option">删除</button></td>
          `;
               optionsTable.appendChild(newRow);

               // Add event listener to the delete button of the new row
               const deleteButton = newRow.querySelector('.btn.delete-option');
               deleteButton.addEventListener('click', () => {
                    newRow.remove();
               });

               // Add event listener to the move-up button of the new row
               const moveUpButton = newRow.querySelector('.btn.move-up');
               moveUpButton.addEventListener('click', () => {
                    const previousRow = newRow.previousElementSibling;
                    if (previousRow) {
                         optionsTable.insertBefore(newRow, previousRow);
                    }
               });

               // Add event listener to the move-down button of the new row
               const moveDownButton = newRow.querySelector('.btn.move-down');
               moveDownButton.addEventListener('click', () => {
                    const nextRow = newRow.nextElementSibling;
                    if (nextRow) {
                         optionsTable.insertBefore(nextRow, newRow);
                    }
               });
          };
          // Add event listener to the "添加选项" button
          const addButton = this.modals.get('checkboxModal').$body.find('#add-option')[0]
          // const addButton = modal.querySelector('#add-option');
          addButton.addEventListener('click', fnAdd);

          // Add event listeners to the buttons
          const okButton = this.modals.get('checkboxModal').$body.find('.okButton')[0]
          // const okButton = modal.querySelector('.okButton');
          okButton.addEventListener('click', () => {
               const inputName = this.modals.get('checkboxModal').$body.find('#orgname')[0].value;
               const inputId = this.modals.get('checkboxModal').$body.find('#inputId')[0].value;
               const isVertical = this.modals.get('checkboxModal').$body.find('#vertical')[0].checked;
               const value_regular = this.modals.get('checkboxModal').$body.find('#value_regular')[0].value;
               const display_regular = this.modals.get('checkboxModal').$body.find('#display_regular')[0].value;
               const checkboxInputs = optionsTable.querySelectorAll('input[type="checkbox"]');
               const alignmentStyle = isVertical ? 'div' : 'span';
               const inputField= document.getElementById(`${originId}_component`)

               // window.alert(inputId)

               var alldata = this.html.get()
               var condition = checkId(alldata, inputId, originId)

               if (!inputName || !inputId || checkboxInputs.length < 1) {
                    window.alert('Some fields must be required')
                    return
               }
               console.log(inputId, '======', originId)
               if (condition) {
                    window.alert('There is a same id======')
                    return;
               }
               // Loop through each checkbox input
               let inputFields = '';

               checkboxInputs.forEach((input) => {
                    // Get the value of the corresponding input in the same row
                    const value = input.parentNode.parentNode.querySelector('input[type="text"]').value;
                    inputFields += `
                    <${alignmentStyle} class="component" contenteditable="false">
                         <input 
                         class = "component"
                         style="${alignmentStyle}" 
                         data-value_regular = "${value_regular}"
                         data-display_regular = "${display_regular}"
                         data-isVertical = "${isVertical}"
                         type="checkbox"
                         name="${inputName}" 
                         id="${inputId}" 
                         ${input.checked ? 'checked' : ''}/>
                         <label 
                         class="component"
                         contenteditable="false"
                          for="${inputId}">${value}</label>
                    </${alignmentStyle}>
               `;
               });

               if (inputField !== null) {
                    inputField.setAttribute('id', `${inputId}_component`)
                    inputField.setAttribute('name', `${inputName}`)
                    inputField.innerHTML = inputFields;
                    // flag = false;
               } else {
                    const innerField = `
                    <span class="check component parent" id="${inputId}_component" name ="${inputName}" contenteditable="false" >
                         ${inputFields}
                    </span>
               `;

                    this.html.insert(innerField);
               }
               this.modals.hide('checkboxModal')

          });


          // Function to handle the click event of the "动态数据" button
          const dynamicDataButton = this.modals.get('checkboxModal').$body.find('.oak-tab-list .item:last-child')[0];
          dynamicDataButton.addEventListener('click', () => {
               const dynamicContent = this.modals.get('checkboxModal').$body.find('#dynamic')[0];
               const fixedContent = this.modals.get('checkboxModal').$body.find('#fixed')[0];

               dynamicContent.classList.add('active');
               fixedContent.classList.remove('active');
               // Add the "active" class to the clicked button
               dynamicDataButton.classList.add('active');
               fixedOptionsButton.classList.remove('active');
          });

          // Function to handle the click event of the "固定选项" button
          const fixedOptionsButton = this.modals.get('checkboxModal').$body.find('.oak-tab-list .item:first-child')[0];
          fixedOptionsButton.addEventListener('click', () => {
               const dynamicContent = this.modals.get('checkboxModal').$body.find('#dynamic')[0];
               const fixedContent = this.modals.get('checkboxModal').$body.find('#fixed')[0];

               dynamicContent.classList.remove('active');
               fixedContent.classList.add('active');
               // Add the "active" class to the clicked button
               fixedOptionsButton.classList.add('active');
               dynamicDataButton.classList.remove('active');
          });

          // Add event listener to the ok button
          okButton.addEventListener('mouseenter', () => {
               okButton.style.backgroundColor = 'rgb(210, 210, 210)'; // Change the background color on mouse enter
          });
          okButton.addEventListener('mouseleave', () => {
               okButton.style.backgroundColor = 'transparent'; // Change the background color back on mouse leave
          });

          const cancelButton = this.modals.get('checkboxModal').$body.find('.cancelButton')[0];

          cancelButton.addEventListener('mouseenter', () => {
               cancelButton.style.backgroundColor = 'rgb(210, 210, 210)'; // Change the background color on mouse enter
          });
          cancelButton.addEventListener('mouseleave', () => {
               cancelButton.style.backgroundColor = 'transparent'; // Change the background color back on mouse leave
          });
          cancelButton.addEventListener('click', () => {
               this.modals.hide('checkboxModal')
          });

     }

});




