import FroalaEditor from 'froala-editor';
import { checkId } from '../sheet/ids'

FroalaEditor.DefineIcon('insertSelectBox', { NAME: 'insertSelectBox', SVG_KEY: 'star' });
FroalaEditor.RegisterCommand('insertSelectBox', {
     title: 'insertSelectBox',
     focus: true,
     undo: true,
     refreshAfterCallback: false,
     icon: `<svg  viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <path fill="#444" d="M15 4h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6c0-0.6-0.4-1-1-1zM10 11h-9v-6h9v6zM13 8.4l-2-1.4h4l-2 1.4z"></path>
     <path fill="#444" d="M2 6h1v4h-1v-4z"></path>
     </svg>`, // Use the custom icon here

     callback: function () {
          sessionStorage.setItem('inputId', undefined);
          this.commands.exec('selectboxModal');
     }
});



FroalaEditor.DefineIcon('selectboxModal', { NAME: 'selectboxModal', SVG_KEY: 'star' });
FroalaEditor.RegisterCommand('selectboxModal', {
     title: 'Insert SelectBox',
     focus: true,
     undo: true,
     refreshAfterCallback: false,

     callback: function () {
          // Create and display a new modal window
          var modal_body = `
          <div style="padding:20px">
          <button class="close-button">X</button>
          <div class="content">
               <div class="table-container">
                    <table class="table oak-table">
                         <tr>
                              <th><span>控件名称</span><span class="label label-important">*</span></th>
                              <th><span>控件ID</span></th>
                              <th><span>字体颜色</span></th>
                              <th><span>默认值</span></th>
                         </tr>
                         <tr>
                              <td><input type="text" id="orgname" placeholder="必填项" /></td>
                              <td><input type="text" id="inputId" placeholder="可选项" /></td>
                              <td><input type="color" id="color" value="#3c3c3c" placeholder="字体颜色" /></td>
                              <td><input type="text" id="defaultValue" placeholder="默认值" disabled /></td>
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
                                   <div class="foot-btn" id ='foot-btn'>
                                        <button class="btn primray" id="add-option">添加选项</button>
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
                                   <input type="text" placeholder="支持get请求的完整url地址（http://）" style="width:90%;" id="url">
                                   <div class="alert alert-info">
                                        <h4>提示：</h4>
                                        <ol>
                                             <li>1.如url中的值不为空此时不关注固定选项中有没有值，优先取地址中的值；</li>
                                             <li>2.地址中的json格式如下：<br>[{VALUE:'',TEXT:'',SELECTED:0/1}]<br>其中SELECTED=0未选中，SELECTED=1已选中</li>
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
          </div> `

          var inputId = sessionStorage.getItem('inputId')
          var originId = inputId
          this.modals.create('selectboxModal', `  <div class="modal-header"><h3 class="modal-title">插入下拉框</h3></div>`, modal_body);

          if (inputId != 'undefined') {
               this.modals.get('selectboxModal').$body[0].innerHTML = modal_body
               const selectComponent = document.getElementById(`${originId}_component`).querySelectorAll(`select[id="${inputId}"]`)[0]
               const inputName = selectComponent.getAttribute('name');
               const value_regular = selectComponent.getAttribute('data-value_regular')
               const display_regular = selectComponent.getAttribute('data-display_regular')
               const optionsVal = document.getElementById(`${originId}_component`).querySelectorAll(`select[id="${inputId}"]`)[0].children;
               const optionsTable = this.modals.get('selectboxModal').$body.find('#options_table')[0];
               const selectedVal = selectComponent.value;

               for(const option of optionsVal){
                    var isSelected = false;
                    if(option.value==selectedVal){
                         isSelected = true;
                    }
                    console.log(isSelected,' here is isSelected')
                    const newRow = document.createElement('tr');
                         newRow.innerHTML = `
                              <td><input name="Rgruop" type="radio"  ${isSelected==true? 'checked' : ''}></td>
                              <td><input type="text" value="${option.value}"></td>
                              <td><span class="btn-group clrfix"><button class="btn move-down">下移</button> <button class="btn move-up">上移</button> <button class="btn delete-option">删除</button></td>
                              `;
                         optionsTable.appendChild(newRow);

               }

               this.modals.get('selectboxModal').$body.find('#orgname')[0].value = inputName;
               this.modals.get('selectboxModal').$body.find('#inputId')[0].value = inputId;
               this.modals.get('selectboxModal').$body.find('#value_regular')[0].value = value_regular;
               this.modals.get('selectboxModal').$body.find('#display_regular')[0].value = display_regular;

          } else {
               this.modals.get('selectboxModal').$body[0].innerHTML = modal_body
               this.modals.get('selectboxModal').$body.find('#orgname')[0].value = '';
               this.modals.get('selectboxModal').$body.find('#inputId')[0].value = '';
               this.modals.get('selectboxModal').$body.find('#value_regular')[0].value = '';
               this.modals.get('selectboxModal').$body.find('#display_regular')[0].value = '';
               this.modals.get('selectboxModal').$body.find('#options_table')[0].innerHTML = ''
          }
          this.modals.show('selectboxModal')

          const optionsTable = this.modals.get('selectboxModal').$body.find('#options_table')[0]
          const fnAdd = () => {
               const newRow = document.createElement('tr');
               newRow.innerHTML = `
               <td><input name="Rgroup" type="radio"></td>
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
          }

          // Add event listener to the "添加选项" button
          const addButton = this.modals.get('selectboxModal').$body.find('#add-option')[0]
          // const addButton = modal.querySelector('#add-option');
          addButton.addEventListener('click', fnAdd);

          // Add event listeners to the buttons
          const okButton = this.modals.get('selectboxModal').$body.find('.okButton')[0]
          okButton.addEventListener('click', () => {
               const inputName = this.modals.get('selectboxModal').$body.find('#orgname')[0].value;
               const inputId = this.modals.get('selectboxModal').$body.find('#inputId')[0].value;
               const value_regular = this.modals.get('selectboxModal').$body.find('#value_regular')[0].value;
               const display_regular = this.modals.get('selectboxModal').$body.find('#display_regular')[0].value;
               const textColor = this.modals.get('selectboxModal').$body.find('#color')[0].value;
               const radioOptions = optionsTable.querySelectorAll('input[type="radio"]');
               const selectOptions = optionsTable.querySelectorAll('input[type="text"]');

               const parentComponent = document.getElementById(`${originId}_component`)
               var index;


               for(var i=0; i<radioOptions.length; i++){
                    if(radioOptions[i].checked)
                    index = i;

               }
             
               console.log(selectOptions[index].value,'here is index')
               var alldata = this.html.get()
               var condition = checkId(alldata, inputId, originId)

               if (!inputName || !inputId || radioOptions.length < 1) {
                    window.alert('Some fields must be required')
                    return
               }

               if (condition) {
                    window.alert('There is a same id======')
                    return;
               }

               // Loop through each select option
               let inputFields = '';

               inputFields += `
               <span class="component">
                    <select
                    class="component"
                         name="${inputName}" 
                         id="${inputId}"
                         data-value_regular = "${value_regular}"
                         data-display_regular = "${display_regular}"
                         style="color: ${textColor}"
                        
                     >
               `;
               selectOptions.forEach((option, nm) => {
                    // Get the value of the corresponding input in the same row
                    console.log(option,'here is option')
                    const value = option.value;
                    console.log("value", value);
                    inputFields += `
                    <option value="${value}" ${nm==index?'selected':''} name =>${value}</option>
               `;
               });
               inputFields += `
                    </select>
               </span>
               `;

               if (parentComponent !== null) {
                    parentComponent.setAttribute('id', `${inputId}_component`)
                    parentComponent.setAttribute('name', `${inputName}`)
                    parentComponent.innerHTML = inputFields
               } else {
                    const innerField = `
                    <span class="select component parent" id="${inputId}_component" name = ${inputName} contenteditable="false">
                         ${inputFields}
                    </span>
               `;
                    this.html.insert(innerField);
               }
               this.modals.hide('selectboxModal')

          });

          // Function to handle the click event of the "动态数据" button
          const dynamicDataButton = this.modals.get('selectboxModal').$body.find('.oak-tab-list .item:last-child')[0];
          dynamicDataButton.addEventListener('click', () => {
               const dynamicContent = this.modals.get('selectboxModal').$body.find('#dynamic')[0];
               const fixedContent = this.modals.get('selectboxModal').$body.find('#fixed')[0];
               dynamicContent.classList.add('active');
               fixedContent.classList.remove('active');
               // Add the "active" class to the clicked button
               dynamicDataButton.classList.add('active');
               fixedOptionsButton.classList.remove('active');
          });

          // Function to handle the click event of the "固定选项" button
          const fixedOptionsButton = this.modals.get('selectboxModal').$body.find('.oak-tab-list .item:first-child')[0];
          fixedOptionsButton.addEventListener('click', () => {
               const dynamicContent = this.modals.get('selectboxModal').$body.find('#dynamic')[0];
               const fixedContent = this.modals.get('selectboxModal').$body.find('#fixed')[0];

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

          const cancelButton = this.modals.get('selectboxModal').$body.find('.cancelButton')[0];

          // Add event listener to the cancel button
          cancelButton.addEventListener('mouseenter', () => {
               cancelButton.style.backgroundColor = 'rgb(210, 210, 210)'; // Change the background color on mouse enter
          });
          cancelButton.addEventListener('mouseleave', () => {
               cancelButton.style.backgroundColor = 'transparent'; // Change the background color back on mouse leave
          });
          cancelButton.addEventListener('click', () => {
               // Handle Cancel button click
               // Close the modal window if needed
               this.modals.hide('selectboxModal')
          });

     }

});


