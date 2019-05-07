<template>
    <v-card>
        <header>Fee Summary</header>
        <v-slide-y-transition group tag="ul" class="fee-list">
            <li class="container fee-list__item" v-show="fee.filing_type" v-for="fee in fees" :key="fee.filing_type">
                <div class="fee-list__item-name">{{fee.filing_type}}</div>
                <div class="fee-list__item-value">{{fee.filing_fees | currency}}</div>
            </li>
        </v-slide-y-transition>
        <div class="container fee-total">
            <div class="fee-total__name">Total Fees</div>
            <div class="fee-total__currency">CDN</div>
            <div class="fee-total__value">
                <v-slide-y-reverse-transition name="slide" mode="out-in">
                    <div :key="totalFees">{{totalFees | currency}}</div>
                </v-slide-y-reverse-transition>
            </div>
        </div>
    </v-card>
</template>

<script lang="ts">

    import FeeServices from '../services/fee.services'

    export default {
        name: 'sbc-fee-summary',
        props: {
            feecodes: {
                type: Array,
            },
            entityType:{
                type:   String,
            }
        },

        data: () => ({
            fees: [

            ]
        }),
        computed: {
            totalFees() {
                return this.fees.reduce((acc, item) => acc + item.filing_fees, 0)
            }
        },
        mounted() {
            FeeServices.getFee(this.entityType, this.feecodes).then(data => {
                this.fees = data
            })

        }
    }
</script>

<style lang="stylus" scoped>
    @import "../assets/styl/theme.styl"
    header
        padding 1rem 1.25rem
        color #fff
        background $BCgovBlue5
        font-weight 700

    .container
        display flex
        flex-flow row nowrap
        line-height 1.2rem
        font-size 0.875rem

    .fee-list
        border-bottom 1px solid $gray3

    .fee-list__item
        &-name,
        &-value
            font-weight 700

        &-name
            flex 1 1 auto
            margin-right 2rem

        &-value
            flex 0 0 auto
            text-align right

    .fee-list__item + .fee-list__item
        border-top 1px solid $gray3

    .fee-total
        align-items center
        letter-spacing -0.01rem
        line-height auto

        &__name
            flex 1 1 auto
            margin-right auto
            font-weight 700

        &__currency
            margin-right 0.5rem
            color $gray5
            font-weight 500

        &__value
            font-size 1.65rem
            font-weight 700

</style>
