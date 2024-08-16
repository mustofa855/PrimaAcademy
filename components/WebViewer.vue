<template>
    <div>
        <iframe id="iframepdf" :src="path" width="100%" height="700"></iframe>
    </div>
</template>
<script>
export default {
    props: ['path']
}
</script>