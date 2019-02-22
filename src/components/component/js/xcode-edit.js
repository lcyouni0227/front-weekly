
import "codemirror/lib/codemirror.css";
//编辑器代码高亮css文件
import "codemirror/addon/hint/show-hint.css";

let CodeMirror = require("codemirror/lib/codemirror");
require("codemirror/addon/edit/matchbrackets");
//选中行高亮文件
require("codemirror/addon/selection/active-line");
require("codemirror/addon/hint/show-hint");

//代码折叠文件
require('codemirror/addon/fold/foldcode.js');
require('codemirror/addon/fold/foldgutter.js');
require('codemirror/addon/edit/matchbrackets.js');
require('codemirror/addon/fold/brace-fold.js');
//缩进文件
require('codemirror/addon/fold/indent-fold.js');

//addon文件夹放的是Code Mirror的功能插件
require('codemirror/addon/fold/comment-fold.js');
export default {
    name: "XCodeEdit",
    props: {
        code:[String,Object],
        theme:{type: String, default: 'default'}
    },
    mounted () {
        this._xCodeEditInit();
    },
    methods: {
        _xCodeEditInit(){
            let editor = CodeMirror.fromTextArea(this.$refs.code, {
                mode: this.mime,
                indentWithTabs: true,
                smartIndent: true,
                lineNumbers: true,
                matchBrackets: true,
                theme: this.theme,
                autofocus: true,
                extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键
                hintOptions:this.hintOptions
            });
            //代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
            editor.on('cursorActivity', function () {
                editor.showHint()
            })
        }
    }
}