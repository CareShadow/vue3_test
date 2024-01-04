<template>
    <codemirror v-model="code" placeholder="Please start your inquiry" :style="{ height: '400px' }" :autofocus="true"
        :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" @change="log('change', $event)"
        @focus="log('focus', $event)" @blur="log('blur', $event)" />
</template>
  
<script>
import { ref, shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { sql } from '@codemirror/lang-sql'
import { basicSetup } from 'codemirror'
import { tags } from "@lezer/highlight"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { oneDark } from '@codemirror/theme-one-dark'

export default {
    name: 'CodeEditor',
    components: {
        Codemirror
    },
    setup() {
        const code = ref('select * from table')

        const myHighlightStyle = HighlightStyle.define([
            { tag: tags.keyword, color: "navy", fontWeight: "700", lineHeight: "1em" },
            { tag: tags.comment, color: "green", fontStyle: "italic" }
        ])
        const extensions = [sql(), oneDark, basicSetup, syntaxHighlighting(myHighlightStyle)]

        const view = shallowRef()
        const handleReady = (payload) => {
            view.value = payload.view
        }

        const getCodemirrorStates = () => {
            const state = view.value.state
            const ranges = state.selection.ranges
            const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
            const cursor = ranges[0].anchor
            const length = state.doc.length
            const lines = state.doc.lines
        }

        return {
            code,
            extensions,
            handleReady,
            log: console.log
        }
    }
}
</script>