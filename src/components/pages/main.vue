<template>

	<div>555555</div>
</template>

<script>


export default {

	data() {
		return {

		};
	},
	mounted() {
		window.addEventListener('resize', this.getHeight);
		this.getHeight();

	},
	methods: {
		getHeight() {
			this.cardStyle.height = (window.innerHeight - 280) / 2 + 'px';
			this.carouselStyle.height = (window.innerHeight - 280) / 2 + 90 + 'px';
		}

	}
};
</script>

<style>

</style>
