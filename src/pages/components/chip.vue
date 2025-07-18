<script setup>
import {
  closable,
  color,
  elevated,
  expandable,
  inSelects,
  outlined,
  rounded,
  sizes,
  withAvatar,
  withIcon,
} from '@/views/demos/components/chip/demoCodeChip'
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Color -->
      <AppCardCode
        title="Color"
        :code="color"
      >
        <p>Use <code>color</code> prop to change the background color of chips.</p>

        <DemoChipColor />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Elevated -->
      <AppCardCode
        title="Elevated"
        :code="elevated"
      >
        <p>Use <code>elevated</code> variant option to create filled chips.</p>

        <DemoChipElevated />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Outlined -->
      <AppCardCode
        title="Outlined"
        :code="outlined"
      >
        <p>Use <code>outlined</code> variant option to create outline border chips.</p>

        <DemoChipOutlined />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Label -->
      <AppCardCode
        title="Rounded"
        :code="rounded"
      >
        <p>To use the rounded chip, set <code>label</code> props value to <strong>false</strong>.</p>

        <DemoChipRounded />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Closable -->
      <AppCardCode
        title="Closable"
        :code="closable"
      >
        <p>Closable chips can be controlled with a <code>v-model</code>.</p>

        <DemoChipClosable />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Chip With Icon -->
      <AppCardCode
        title="With Icon"
        :code="withIcon"
      >
        <p>Chips can use text or any icon available in the Material Icons font library.</p>

        <DemoChipWithIcon />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Avatar -->
      <AppCardCode
        title="With Avatar"
        :code="withAvatar"
      >
        <p>Use <code>pill</code> prop to remove the <code>v-avatar</code> padding.</p>

        <DemoChipWithAvatar />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Sizes -->
      <AppCardCode
        title="Sizes"
        :code="sizes"
      >
        <p>The <code>v-chip</code> component can have various sizes from <code>x-small</code> to <code>x-large</code>.</p>

        <DemoChipSizes />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 In Selects -->
      <AppCardCode
        title="In Selects"
        :code="inSelects"
      >
        <p>Selects can use <code>chips</code> to display the selected data. Try adding your own tags below.</p>

        <DemoChipInSelects />
      </AppCardCode>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 Expandable -->
      <AppCardCode
        title="Expandable"
        :code="expandable"
      >
        <p>Chips can be combined with <code>v-menu</code> to enable a specific set of actions for a chip.</p>

        <DemoChipExpandable />
      </AppCardCode>
    </VCol>
  </VRow>
</template>
