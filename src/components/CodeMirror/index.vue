<template>
    <codemirror v-model="code" placeholder="Please start your inquiry" :style="{ height: '400px', fontSize: '16px' }"
        :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions"
        @change="(value) => $emit('changeByEditor', value)" />
</template>
  
<script setup>
import { ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { sql } from '@codemirror/lang-sql'
import { basicSetup } from 'codemirror'
import { tags } from "@lezer/highlight"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { oneDark } from '@codemirror/theme-one-dark'

const code = ref('select * \nfrom table')
const myHighlightStyle = HighlightStyle.define([
    { tag: tags.keyword, color: "navy", fontWeight: "700", lineHeight: "1em" },
    { tag: tags.comment, color: "green", fontStyle: "italic" }
])
const extensions = [sql(), oneDark, basicSetup, syntaxHighlighting(myHighlightStyle)]

</script>