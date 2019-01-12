<template>
    <section>
        <dropzone
            id="logoDropzone"
            ref="logoUpdoader" 
            :options="options" 
            :destroyDropzone="true"
            :include-styling="false"
            @vdropzone-files-added="filesAdded"
            @vdropzone-removed-file="fileRemoved"
        />
    </section>
</template>

<script>
    import dropzone from 'nuxt-dropzone'
    export default {
        props: {
            displayedLogo: {
                type: Object,
                default: () => {
                    return {
                        metadata: null,
                        url: null
                    }
                }
            },
            maxImages: {
                type: Number,
                default: 1
            },
            resizeWidth: {
                type: Number,
                default: 100
            },
            resizeHeight: {
                type: Number,
                default: 200
            }
        },
        components: {
            dropzone
        },
        mounted() {
            if(this.displayedLogo.url) {
                this.$refs.logoUpdoader.manuallyAddFile(this.displayedLogo.metadata, this.displayedLogo.url)
            }
        },
        data() {
            return {
                options: {
                    url: 'https://tadicho-dev.appspot.com',
                    autoProcessQueue: false,
                    maxFiles: this.maxImages,
                    maxFilesize: 2,
                    resizeWidth: this.resizeWidth,
                    resizeHeight: this.resizeHeight,
                    acceptedFiles: 'image/jpeg, image/jpg, image/png',
                    thumbnailWidth: null,
                    addRemoveLinks: true,
                    dictDefaultMessage: "<i class='fa fa-cloud-upload w3-xxlarge'></i>",
                    dictRemoveFile: "<div class= 'w3-large'> Xóa ảnh</div>",
                    dictMaxFilesExceeded: "Lỗi! Vượt quá số ảnh cho phép",
                    dictFileTooBig: "Lỗi! Kích thước ảnh lớn nhất cho phép là 2MB"
                }
            }
        },
        methods: {
            filesAdded() {
                this.$emit('logoAdded', this.$refs.logoUpdoader.getAcceptedFiles())
            },
            fileRemoved(image) {
                this.$emit('logoRemoved', image)
            },
            template() {
                return `<div class="dz-preview dz-file-preview">
                            <div class="dz-image">
                                <div data-dz-thumbnail-bg></div>
                            </div>
                            <div class="dz-details">
                                <div class="dz-size"><span data-dz-size></span></div>
                                <div class="dz-filename"><span data-dz-name></span></div>
                            </div>
                            <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                            <div class="dz-error-message"><span data-dz-errormessage></span></div>
                            <div class="dz-success-mark"><i class="fa fa-check"></i></div>
                            <div class="dz-error-mark"><i class="fa fa-close"></i></div>
                        </div>`
            }
        }
    }
</script>

<style scoped>
    #customdropzone {
        background-color: orange;
        font-family: 'Arial', sans-serif;
        letter-spacing: 0.2px;
        color: #777;
        transition: background-color .2s linear;
        height: 200px;
        padding: 40px;
    }

    #customdropzone .dz-preview {
        width: 160px;
        display: inline-block
    }
    #customdropzone .dz-preview .dz-image {
        width: 80px;
        height: 80px;
        margin-left: 40px;
        margin-bottom: 10px;
    }
    #customdropzone .dz-preview .dz-image > div {
        width: inherit;
        height: inherit;
        border-radius: 50%;
        background-size: contain;
    }
    #customdropzone .dz-preview .dz-image > img {
        width: 100%;
    }

    #customdropzone .dz-preview .dz-details {
        color: white;
        transition: opacity .2s linear;
        text-align: center;
    }
    #customdropzone .dz-success-mark, .dz-error-mark, .dz-remove {
        display: none;
    }
</style>
