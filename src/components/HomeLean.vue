<template>
  <div id="root">
    <div id="intbird">
      <li>
      <li/>
      <p>p</p>
      <li>
      <li/>
      <p>p</p>

      <ol>
        <li>" ": 后代选择器(所有出现的,不管距离多远)</li>
      </ol>
      <ol>
        <li>">": 子选择器(只有一代)</li>
      </ol>
      <ol>
        <li>"+": 匹配相邻的两个(相当于正则)</li>
      </ol>
    </div>

    <div class="class">
      <li></li>
      <a>111</a>
    </div>

    <div class="class" name="1">
      [name=1]
    </div>
    <div class="class" name="2">
      [name=2]
    </div>

    <div class="class" name="hello">
      [name=hello]
    </div>
    <div class="class" name="hello word">
      [name~=helloword] 适用于 空格
    </div>
    <div class="class" name="hello-word">
      [name|=helloword] 适用于 连字
    </div>

    <div class="class">
      =
      ~=
      |=
      ^=
      $=
      *=
    </div>

    <div name="intbird">
      intbird[name=intbird]
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeLean"
  }
</script>

<style scoped>
  #root {
    padding: 100px;
    margin-top: 100px;
    margin-bottom: 100px;
  }

  #intbird {
    background-color: aqua;
  }

  #intbird p {
    background-color: green;
  }

  #intbird > li {
    background-color: darkmagenta;
  }

  div > ol {
    background-color: greenyellow;
  }

  ol + ol + ol {
    background-color: bisque;
  }


  .class a {
    background-color: black;
  }

  [name] {
    background-color: brown;
  }

  [name='2'] {
    background-color: red;
  }

  [name~=hello] {
    background-color: cornflowerblue;
  }

  div[name='intbird'] {
    background-color: cadetblue;
  }
</style>
