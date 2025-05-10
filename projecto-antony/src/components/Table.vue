<template>
    <table>
        <thead>
            <tr>
                <th v-for="col in columns" :key="col" class="p-2 border-b capitallize">
                    {{ col }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    {{ item[col] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>

</script>