import FroalaEditor from 'froala-editor';
import $ from "jquery"

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

      var $dropdown = $btn.next();
      $dropdown.find('.fr-command').each(function () {
        var $this = $(this);

        // Add a check mark for the selected page size
        if ($this.attr('data-param1') == instance.opts.PageSize) {
          $this.prepend(`<i class="fa fa-check"></i>`);
        }
      })
    },

  });
