import FroalaEditor from 'froala-editor';
import { checkId } from '../sheet/ids'

FroalaEditor.DefineIcon('insertRadio', { NAME: 'insertRadio', SVG_KEY: 'star' });
FroalaEditor.RegisterCommand('insertRadio', {
     title: 'insertRadio',
     focus: true,
     undo: true,
     refreshAfterCallback: false,
     icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000"  viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>`, // Use the custom icon here

     callback: function () {
          sessionStorage.setItem('inputId', undefined);
          this.commands.exec('radioModal');
     }
});



FroalaEditor.DefineIcon('radioModal', { NAME: 'radioModal', SVG_KEY: 'star' });
FroalaEditor.RegisterCommand('radioModal', {
     title: 'Insert Radio',
     focus: true,
     undo: true,
     refreshAfterCallback: false,
     callback: function () {
          // Create and display a new modal window
          var modal_body = `<div style="padding:20px">
    
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
                              <td><input type="text" id="inputId" placeholder="可选项" /></td>
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
                                   <table id="options_table" class="tafble oak-table">
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
                                             2.地址中的json格式如下：<br />[{VALUE:'',TEXT:'',SELECTED:0/1}]<br />其中SELECTED=0未选中，SELECTED=1已选中
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
    
    </div>`

          var inputId = sessionStorage.getItem('inputId')
          var originId = inputId;

          // Create the modal using the template
          this.modals.create('radioModal', `<div class="modal-header"><h3 class="modal-title">插入单选框</h3></div>`, modal_body);
          if (inputId != 'undefined') {
               this.modals.get('radioModal').$body[0].innerHTML = modal_body
               const radioComponent = document.getElementById(`${originId}_component`).querySelectorAll(`input[id="${inputId}"]`)[0]
               console.log(radioComponent, '=====checkComponent', originId, inputId)
               const inputName = radioComponent.getAttribute('name');
               const isVertical = radioComponent.getAttribute('data-isVertical');
               const value_regular = radioComponent.getAttribute('data-value_regular')
               const display_regular = radioComponent.getAttribute('data-display_regular')
               const optionsVal = document.getElementById(`${originId}_component`).querySelectorAll(`input[id="${inputId}"]`);
               const optionsTable = this.modals.get('radioModal').$body.find('#options_table')[0];


               optionsVal.forEach((field) => {
                    if (field) {
                        
                         var label = field.parentNode.children[1].innerText
                         console.log(label, 'here is label')

                         const newRow = document.createElement('tr');
                         newRow.innerHTML = `
                    <td><input type="radio" name="radio group" ${field.checked ? 'checked' : ''} ></td>
                    <td><input type="text" value="${label}"></td>
                    <td><span class="btn-group clrfix"><button class="btn move-down">下移</button> <button class="btn move-up">上移</button> <button class="btn delete-option">删除</button></td>
                    `;
                         optionsTable.appendChild(newRow);
                    }
               });


               this.modals.get('radioModal').$body.find('#orgname')[0].value = inputName;
               this.modals.get('radioModal').$body.find('#inputId')[0].value = inputId;
               this.modals.get('radioModal').$body.find('#vertical')[0].checked = isVertical;
               this.modals.get('radioModal').$body.find('#horizontal')[0].checked = isVertical;
               // this.modals.get('radioModal').$body.find('#isVertical')[0].checked;
               // this.modals.get('radioModal').$body.find('#isVertical')[0].checked = isVertical;
               this.modals.get('radioModal').$body.find('#value_regular')[0].value = value_regular;
               this.modals.get('radioModal').$body.find('#display_regular')[0].value = display_regular;

          } else {

               this.modals.get('radioModal').$body[0].innerHTML = modal_body
               this.modals.get('radioModal').$body.find('#orgname')[0].value = '';
               this.modals.get('radioModal').$body.find('#inputId')[0].value = '';
               this.modals.get('radioModal').$body.find('#horizontal')[0].checked = true;
               this.modals.get('radioModal').$body.find('#vertical')[0].checked = false;
               this.modals.get('radioModal').$body.find('#value_regular')[0].value = '';
               this.modals.get('radioModal').$body.find('#display_regular')[0].value = '';
               this.modals.get('radioModal').$body.find('#options_table')[0].innerHTML = ''

          }
          this.modals.show('radioModal')

          const optionsTable = this.modals.get('radioModal').$body.find('#options_table')[0]

          const fnAdd = () => {
               const newRow = document.createElement('tr');
               newRow.innerHTML = `
          <td><input name="radio group" type="radio"></td>
          <td><input  type="text" id="defaultValue"></td>
          <td><span class="btn-group clrfix"><button class="btn move-down">下移</button> <button class="btn move-up">上移</button> <button class="btn delete-option">删除</button></td>
          `;
               optionsTable.appendChild(newRow);
          };
          // Add event listener to the "添加选项" button
          const addButton = this.modals.get('radioModal').$body.find('#add-option')[0]
          addButton.addEventListener('click', fnAdd);


          // Add event listeners to the buttons
          const okButton = this.modals.get('radioModal').$body.find('.okButton')[0]
          okButton.addEventListener('click', () => {
               // Get input values from the modal
               const inputName = this.modals.get('radioModal').$body.find('#orgname')[0].value;
               const inputId = this.modals.get('radioModal').$body.find('#inputId')[0].value;
               const isVertical = this.modals.get('radioModal').$body.find('#vertical')[0].checked;
               const value_regular = this.modals.get('radioModal').$body.find('#value_regular')[0].value;
               const display_regular = this.modals.get('radioModal').$body.find('#display_regular')[0].value;
               const radioInputs = optionsTable.querySelectorAll('input[type="radio"]');
               const alignmentStyle = isVertical ? 'div' : 'span';
               const parentComponent = document.getElementById(`${originId}_component`)

               // Get the checkbox inputs from the options table
               var alldata = this.html.get()
               var condition = checkId(alldata, inputId, originId)

               if (!inputName || !inputId || radioInputs.length < 1) {
                    window.alert('Some fields must be required')
                    return
               }
               console.log(inputId, '======', originId)
               if (condition) {
                    window.alert('There is a same id======')
                    return;
               }

               console.log(radioInputs.length, '====radioinputs')
               if (!inputName || !inputId || radioInputs.length < 1) {
                    window.alert('Some fields must be required')
                    return
               }
               // Loop through each checkbox input
               let inputFields = '';
               // ids.push(inputId);

               radioInputs.forEach((input) => {

                    // Get the value of the corresponding input in the same row
                    const value = input.parentNode.parentNode.querySelector('input[type="text"]').value;
                    console.log("input", input.checked);
                   
                    inputFields += `
                    <${alignmentStyle} class="component">
                         <input type="radio"
                              class="component"
                              data-value_regular = "${value_regular}"
                              data-display_regular = "${display_regular}"
                              data-isVertical = "${isVertical}"
                              name="${inputName}" 
                              id="${inputId}" 
                              ${input.checked ? 'checked' : ''
                         }/>
                         <label for="${inputId}" class="component">${value}</label>
                    </${alignmentStyle}>
               `;
               });


               if (parentComponent !== null) {

                    parentComponent.setAttribute('id', `${inputId}_component`)
                    parentComponent.innerHTML = inputFields;
               } else {

                    const innerField = `
                    <span class="radio component parent" name="${inputName}" id="${inputId}_component" contenteditable="false">
                         ${inputFields}
                    </span>
               `;
                    // Insert the HTML string into the editor at the current cursor position
                    this.html.insert(innerField);

               }

               this.modals.hide('radioModal')

          });


          // Function to handle the click event of the "动态数据" button
          const dynamicDataButton = this.modals.get('radioModal').$body.find('.oak-tab-list .item:last-child')[0];
          dynamicDataButton.addEventListener('click', () => {
               const dynamicContent = this.modals.get('radioModal').$body.find('#dynamic')[0];
               const fixedContent = this.modals.get('radioModal').$body.find('#fixed')[0];

               dynamicContent.classList.add('active');
               fixedContent.classList.remove('active');
               // Add the "active" class to the clicked button
               dynamicDataButton.classList.add('active');
               fixedOptionsButton.classList.remove('active');
          });

          // Function to handle the click event of the "固定选项" button
          const fixedOptionsButton = this.modals.get('radioModal').$body.find('.oak-tab-list .item:first-child')[0];
          fixedOptionsButton.addEventListener('click', () => {
               const dynamicContent = this.modals.get('radioModal').$body.find('#dynamic')[0];
               const fixedContent = this.modals.get('radioModal').$body.find('#fixed')[0];


               dynamicContent.classList.remove('active');
               fixedContent.classList.add('active');
               // Add the "active" class to the clicked button
               fixedOptionsButton.classList.add('active');
               dynamicDataButton.classList.remove('active');
          });


          okButton.addEventListener('mouseenter', () => {
               okButton.style.backgroundColor = 'rgb(210, 210, 210)'; // Change the background color on mouse enter
          });
          okButton.addEventListener('mouseleave', () => {
               okButton.style.backgroundColor = 'transparent'; // Change the background color back on mouse leave
          });

          const cancelButton = this.modals.get('radioModal').$body.find('.cancelButton')[0];

          cancelButton.addEventListener('mouseenter', () => {
               cancelButton.style.backgroundColor = 'rgb(210, 210, 210)'; // Change the background color on mouse enter
          });
          cancelButton.addEventListener('mouseleave', () => {
               cancelButton.style.backgroundColor = 'transparent'; // Change the background color back on mouse leave
          });
          cancelButton.addEventListener('click', () => {
               this.modals.hide('radioModal')
          });



     }

});








