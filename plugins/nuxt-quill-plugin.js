import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import Quill from 'quill'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)



Vue.use(VueQuillEditor)