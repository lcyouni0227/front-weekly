<template>
    <el-form-item>
        <slot>
            <x-input v-bind="$attrs"></x-input>
        </slot>
    </el-form-item>
</template>
<script>
    export default {
        name:'XQueryItem',
    };
</script>