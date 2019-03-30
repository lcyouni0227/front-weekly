<template>
    <div :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    inputSize ? 'el-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'el-input-group': $slots.prepend || $slots.append || label || dialog,
      'el-input-group--append': $slots.append || dialog,
      'el-input-group--prepend': $slots.prepend,
      'el-input--prefix': $slots.prefix || prefixIcon,
      'el-input--suffix': $slots.suffix || suffixIcon || clearable
    }
    ]"
         @mouseenter="hovering = true"
         @mouseleave="hovering = false"
    >
        <template v-if="type !== 'textarea'">
            <!-- 前置元素 -->
            <label class="x-input-label" v-if="label" >{{label}}</label>
            <div class="el-input-group__prepend" v-if="$slots.prepend">
                <slot name="prepend"></slot>
            </div>
            <input
                :tabindex="tabindex"
                v-if="type !== 'textarea'"
                class="el-input__inner"
                v-bind="$attrs"
                :type="type"
                :disabled="inputDisabled"
                :readonly="readonly"
                :autocomplete="autoComplete || autocomplete"
                :value="nativeInputValue"
                ref="input"
                @compositionstart="handleComposition"
                @compositionupdate="handleComposition"
                @compositionend="handleComposition"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
                :aria-label="label"
            >
            <!-- 前置内容 -->
            <span class="el-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="el-input__icon" v-if="prefixIcon" :class="prefixIcon"></i>
      </span>
            <!-- 后置内容 -->
        <span class="el-input__suffix" v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon">
        <span class="el-input__suffix-inner">
          <template v-if="!showClear">
            <slot name="suffix"></slot>
            <i class="el-input__icon" v-if="suffixIcon" :class="suffixIcon"></i>
          </template>
          <i v-else class="el-input__icon el-icon-circle-close el-input__clear" @click="clear"></i>
        </span>
        <i class="el-input__icon" v-if="validateState" :class="['el-input__validateIcon', validateIcon]"></i>
      </span>
            <!-- 后置元素 -->
            <div class="el-input-group__append" v-if="$slots.append">
                <slot name="append"></slot>
            </div>
            <div class="el-input-group__append" v-if="dialog">
                <el-button icon="el-icon-edit-outline" @click="_openDialog"></el-button>
            </div>
            <x-dialog
                custom-class="inputDialog"
                :title="dialog && dialog.title || ''"
                :visible.sync="dialogVisible"
                :width="dialog && dialog.width || '50%'">
                <slot name="dialogContent" v-if="$slots.dialogContent"></slot>
                <component :is="dialog && dialog.content" v-else></component>
                <slot name="dialogFooter"></slot>
                <!--<span slot="footer" >-->
                    <!--<el-button @click="dialogVisible = false">{{dialog && dialog.cancelLabel || '取 消'}}</el-button>-->
                    <!--<el-button type="primary" @click="dialogVisible = false">{{dialog && dialog.okLabel || '确 定'}}</el-button>-->
                <!--</span>-->
            </x-dialog>
        </template>
        <textarea
            v-else
            :tabindex="tabindex"
            class="el-textarea__inner"
            :value="nativeInputValue"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
            @input="handleInput"
            ref="textarea"
            v-bind="$attrs"
            :disabled="inputDisabled"
            :readonly="readonly"
            :autocomplete="autoComplete || autocomplete"
            :style="textareaStyle"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            :aria-label="label"
        >
        </textarea>
    </div>
</template>
<script>
    import {Input} from 'element-ui'
    import store from '@/store';
    export default {
        name: "XInput",
        mixins:[Input],
        data(){
            return {
                dialogVisible:false
            }
        },
        props: {
            label:{type: String, default:''},
            size:{type: String, default:store.state.controlStyle.size},
            clearable: {type: Boolean, default: true},
            dialog:{Type:Object,default(){return null}}
        },
        methods:{
            _openDialog(){
                this.dialogVisible = true;
            }
        }
    }
</script>

<style scoped>
    .x-input-label{
        display:table-cell;
        vertical-align: middle;
        color: #909399;
        position: relative;
        white-space: nowrap;
    }
</style>
<style>
    .inputDialog .el-dialog__body{
        height: 100%;
    }
    .inputDialog{
        height: 60%;
    }
</style>