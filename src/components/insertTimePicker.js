import FroalaEditor from 'froala-editor';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import { checkId } from '../sheet/ids'


FroalaEditor.DefineIcon('insertTimePicker', { NAME: 'insertTimePicker', SVG_KEY: 'star' });
FroalaEditor.RegisterCommand('insertTimePicker', {
     title: 'insert TimePicker',
     focus: true,
     undo: true,
     refreshAfterCallback: false,
     icon: `<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <g id="icomoon-ignore">
     </g>
     <path d="M3.205 3.205v25.59h25.59v-25.59h-25.59zM27.729 4.271v4.798h-23.457v-4.798h23.457zM4.271 27.729v-17.593h23.457v17.593h-23.457z" fill="#000000">
     
     </path>
     <path d="M11.201 5.871h1.6v1.599h-1.6v-1.599z" fill="#000000">
     
     </path>
     <path d="M19.199 5.871h1.599v1.599h-1.599v-1.599z" fill="#000000">
     
     </path>
     <path d="M12.348 13.929c-0.191 1.297-0.808 1.32-2.050 1.365l-0.193 0.007v0.904h2.104v5.914h1.116v-8.361h-0.953l-0.025 0.171z" fill="#000000">
     
     </path>
     <path d="M18.642 16.442c-0.496 0-1.005 0.162-1.408 0.433l0.38-1.955h3.515v-1.060h-4.347l-0.848 4.528h0.965l0.059-0.092c0.337-0.525 0.952-0.852 1.606-0.852 1.064 0 1.836 0.787 1.836 1.87 0 0.98-0.615 1.972-1.79 1.972-1.004 0-1.726-0.678-1.756-1.649l-0.006-0.194h-1.115l0.005 0.205c0.036 1.58 1.167 2.641 2.816 2.641 1.662 0 2.963-1.272 2.963-2.895-0-1.766-1.154-2.953-2.872-2.953z" fill="#000000">
     
     </path>
     </svg>`, // Use the custom icon here

     callback: function () {
          sessionStorage.setItem('inputId', undefined);
          this.commands.exec('timeModal');
     }
});




FroalaEditor.DefineIcon('timeModal', { NAME: 'timeModal', SVG_KEY: 'star' });
FroalaEditor.RegisterCommand('timeModal', {
     title: 'timeModal',
     focus: true,
     undo: true,
     refreshAfterCallback: false,
     callback: function () {
          // Create and display a new modal window

          var modal_body = `
          <div style="padding:20px">
          <div class="content">
          <div class="table-container">
          <table class="table oak-table">
          <tr>
          <th style="width: 50%;">
               <span>控件名称</span><span class="label label-important">*</span>
          </th>
          <th style="width: 50%;"><span>控件ID</span></th>
          </tr>
          <tr>
          <td><input type="text" id="orgname" placeholder="控件名称" /></td>
          <td><input type="text" id="inputId" placeholder="控件ID" /></td>
          </tr>
          <tr>
          <th><span>格式</span></th>
          <th><span>默认时间</span></th>
          </tr>
          <tr>
          <td>
               <select id="dateFormat">
               <option value="yy-mm-dd">yy-mm-dd</option>
               <option value="yy年mm月dd日">yy年mm月dd日</option>
               </select>
          </td>
          <td>
               <input
               type="text"
               id="picker"
               placeholder="默认时间"
               />
          </td>
          </tr>
          <tr>
          <th><span>最小时间</span></th>
          <th><span>最大时间</span></th>
          </tr>
          <tr>
          <td>
               <input
               type="text"
               id="minDate"
               placeholder="最小时间"
               />
          </td>
          <td>
               <input
               type="text"
               id="maxDate"
               placeholder="最大时间"
               />
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
               <input type="text" id="width" value="20" style="width: 40px;" /> &
               <input
               type="text"
               id="fontSize"
               value="16"
               style="width: 40px;"
               />px
          </td>
          </tr>

          </table>
     </div>
     </div>
     <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
          <button class="okButton">确定</button>
          <button class="cancelButton">取消</button>
     </div>
     </div>
 
     <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
     <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js"></script>
     <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css">`


          this.modals.create('timeModal', `<div class="modal-header"><h3 class="modal-title">插入时间输入控件</h3></div>`, modal_body);
          // var today = new Date();
          // var currentDate = today.toISOString().slice(0, 10);
          var pickerVal = '';
          // var startDate = '';
          // var endtDate = '';
          var dateFormat = 'yy-mm-dd';

          const inputId = sessionStorage.getItem('inputId');
          const originId = inputId;
          sessionStorage.setItem('originId', originId);

          // initialize date
          if (inputId != 'undefined') {
               const timeComponent = document.getElementById(`${originId}`)
               // console.log(timeComponent,'here is time component')
               pickerVal = timeComponent.value
               // startDate = timeComponent.value.replace('年', '-').replace('月', '-').replace('日', '').replace('时', ':').replace('分', ':').replace('秒', '');
               // endtDate = timeComponent.value.replace('年', '-').replace('月', '-').replace('日', '').replace('时', ':').replace('分', ':').replace('秒', '');
               dateFormat = timeComponent.getAttribute('data-dateFormat')


               const inputName = timeComponent.getAttribute('name');
               const value_regular = timeComponent.getAttribute('data-value_regular')
               const display_regular = timeComponent.getAttribute('data-display_regular')

               this.modals.get('timeModal').$body.find('#picker')[0].value = pickerVal;
               this.modals.get('timeModal').$body.find('#orgname')[0].value = inputName;
               this.modals.get('timeModal').$body.find('#inputId')[0].value = inputId;
               this.modals.get('timeModal').$body.find('#dateFormat')[0].value = dateFormat;
               this.modals.get('timeModal').$body.find('#value_regular')[0].value = value_regular;
               this.modals.get('timeModal').$body.find('#display_regular')[0].value = display_regular;

          } else {
               this.modals.get('timeModal').$body[0].innerHTML = modal_body
               this.modals.get('timeModal').$body.find('#orgname')[0].value = '';
               this.modals.get('timeModal').$body.find('#inputId')[0].value = '';
               this.modals.get('timeModal').$body.find('#color')[0].value = '';
               this.modals.get('timeModal').$body.find('#width')[0].value = '';
               this.modals.get('timeModal').$body.find('#fontSize')[0].value = '';
               this.modals.get('timeModal').$body.find('#value_regular')[0].value = '';
               this.modals.get('timeModal').$body.find('#display_regular')[0].value = '';
          }
          const defaultdateValue = this.modals.get('timeModal').$body.find('#picker')[0]
     

          $('#picker').datepicker({
               dateFormat:dateFormat,
               defaultDate: new Date(),
               onSelect: function () {
               }
          });

          $('#minDate').datepicker({
               dateFormat: dateFormat,
               defaultDate: new Date(),
               onSelect: function () {
               }
          });



          $('#maxDate').datepicker({
               dateFormat: dateFormat,
               defaultDate: new Date(),
               onSelect: function () {
               }
          });


          // let currentValue = defaultdateValue.value.replace('年', '-').replace('月', '-').replace('日', '-').replace('时', ':').replace('分', ':').replace('秒', '');
          $('#dateFormat').change(function()  {
               dateFormat = $(this).val();
               console.log(dateFormat,'here is dateFormate')
               $('#picker').datepicker('option', 'dateFormat', dateFormat);
               $('#minDate').datepicker('option', 'dateFormat', dateFormat);
               $('#maxDate').datepicker('option', 'dateFormat', dateFormat);
          });


          // Function to initialize datepicker on the input field
          const initializeDatepicker = (inputField) => {
               $(inputField).datepicker({
                    dateFormat: dateFormat,
                    onSelect: function (dateText) {
                         $(inputField).val(dateText);
                    }
               });
          };


          this.modals.show('timeModal');

          // Add event listeners to the buttons
          const okButton = this.modals.get('timeModal').$body.find('.okButton')[0]
          okButton.addEventListener('click', () => {

               const inputName = this.modals.get('timeModal').$body.find('#orgname')[0].value;
               const inputId = this.modals.get('timeModal').$body.find('#inputId')[0].value;
               const color = this.modals.get('timeModal').$body.find('#color')[0].value;
               const width = this.modals.get('timeModal').$body.find('#width')[0].value;
               const fontSize = this.modals.get('timeModal').$body.find('#fontSize')[0].value;
               // const minDate = document.getElementById("minDate").value;
               // const maxDate = document.getElementById("maxDate").value;
               const value_regular = this.modals.get('timeModal').$body.find('#value_regular')[0].value;
               const display_regular = this.modals.get('timeModal').$body.find('#display_regular')[0].value;

               var alldata = this.html.get()
               var originId = sessionStorage.getItem('originId')
               var condition = checkId(alldata, inputId, originId)

               if (!inputName || !inputId) {
                    window.alert('Some fields must be required')
                    return
               }
               if (condition) {
                    window.alert('There is same id')
                    return
               }


               const parentComponent = document.getElementById(`${originId}_component`)

               if (parentComponent !== null) {


                    const inputField = `
                         <input type="text" class="time component" 
                              name="${inputName}" id="${inputId}"
                              data-dateFormat  ="${dateFormat}"
                              value="${defaultdateValue.value}" 
                              style="color: ${color}; 
                              width: ${width}; 
                              font-size: ${fontSize}; "
                              data-value_regular = "${value_regular}"
                              data-display_regular = "${display_regular}"
                              />
                    `;
                    parentComponent.setAttribute('id', `${inputId}_component`)
                    parentComponent.setAttribute('name', `${inputName}`)
                    parentComponent.innerHTML = inputField

               } else {

                    const inputField = `
                         <span class="time component parent" id="${inputId}_component" name="${inputName}" >
                              <input type="text" 
                                   class="time component dateinput" 
                                   name="${inputName}" 
                                   id="${inputId}" 
                                   value="${defaultdateValue.value}"
                                   data-dateFormat = "${dateFormat}"
                                   style="color: ${color}; width: ${width}; font-size: ${fontSize}; " 
                                   data-value_regular = "${value_regular}"
                                   data-display_regular = "${display_regular}"
                              />
                         </span>
                    `;

                    this.html.insert(inputField);

               }

               // Initialize datepicker on the newly added input field
               const newInputField = document.getElementById(inputId);
               initializeDatepicker(newInputField);
               this.modals.hide('timeModal')
          });

          // Add event listener to the existing timePickerInput fields
          const timePickerInputs = document.getElementsByClassName('dateinput');
          for (let i = 0; i < timePickerInputs.length; i++) {
               const inputField = timePickerInputs[i];
               inputField.addEventListener('click', () => {
                    initializeDatepicker(inputField);
                    $(inputField).datepicker("show");
               });
          }

          // Add event listener to the ok button
          okButton.addEventListener('mouseenter', () => {
               okButton.style.backgroundColor = 'rgb(210, 210, 210)'; // Change the background color on mouse enter
          });
          okButton.addEventListener('mouseleave', () => {
               okButton.style.backgroundColor = 'transparent'; // Change the background color back on mouse leave
          });

          const cancelButton = this.modals.get('timeModal').$body.find('.cancelButton')[0];
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
               this.modals.hide('timeModal')
          });

          // Add CSS styles to the modal header


     }

});


