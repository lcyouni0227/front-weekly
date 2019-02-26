<!-- 子系统管理 -->
<template>
    <x-table-edit ref="xtableEdit" highlight-current-row stripe style="width:100%;height:100%"
                 :data-source="{module:'system'}"
        >
        <x-query slot="query">
            <x-query-item prop="sysid" label="系统编号"/>
            <x-query-item prop="name" opt="like" label="系统名称"/>
        </x-query>
        <x-table-column prop="sysid" label="系统编号" width="150"/>
        <x-table-column prop="name" label="系统名称" width="200"/>
        <x-table-column prop="memo" label="备注"/>
    </x-table-edit>
</template>

<script>
    export default {
        name:'system'
    };
</script>
