<template>
    <div class="rtl">
        
    </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style scoped>
    .panel-bar{
        margin-bottom:20px;
    }

    .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 20px;
        padding:10px;
    }

    .form-group span{
        font-weight:bold;
    }

    .profile-photo {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 10%;
        border-radius: 50%;
    }

    @media(max-width: 800px) {
        .profile-photo {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 40%;
            border-radius: 50%;
        }
    }
</style>
