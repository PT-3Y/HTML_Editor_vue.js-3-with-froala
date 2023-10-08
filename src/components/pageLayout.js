// import FroalaEditor from 'froala-editor';
import $ from 'jquery'

// Define a custom button
export const pageSizeButton = {
    // Icon name
    icon: 'page',
    // Tooltip
    title: 'PageSize',
    type:'dropdown',
    // Callback function
    callback: function (cmd, val) {
    // Set the height and width of the editor according to the page size
    switch (val) {
    case 'A4':
    this.opts.height = '1123px';
    this.opts.width = '794px';
    break;
    case 'A5':
    this.opts.height = '794px';
    this.opts.width = '559px';
    break;
    case 'Letter':
    this.opts.height = '1056px';
    this.opts.width = '816px';
    break;
    case 'Legal':
    this.opts.height = '1344px';
    this.opts.width = '816px';
    break;
    }
    // Refresh the editor size
    this.size.refresh();
    },
    // Dropdown menu
    refresh: function ($btn, editor) {
    var $dropdown = $btn.next();
    $dropdown.find('.fr-command').each (function () {
    var $this = $(this);
    // Add a check mark for the selected page size
    if ($this.attr('data-param1') == editor.opts.pageSize) {
    $this.prepend('<i class="fa fa-check"></i>');
    }
    })
    },
    // Dropdown content
    dropdown: function () {
    var dropdown = {};
    dropdown['A4'] = 'A4 (210 x 297 mm)';
    dropdown['A5'] = 'A5 (148 x 210 mm)';
    dropdown['Letter'] = 'Letter (8.5 x 11 in)';
    dropdown['Legal'] = 'Legal (8.5 x 14 in)';
    return dropdown;
    }
    };
    
    // Initialize Froala editor with custom button
    // new FroalaEditor('#editor', {
    // toolbarCustomButtons: [pageSizeButton],
    // // Set the default page size
    // // pageSize: 'A4'
    // });




