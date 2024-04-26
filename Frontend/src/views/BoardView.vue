<template>

    <div class="board">
        <div class="board-header">
            <h1>Boards</h1>
        </div>
        <div class="board-content">
            <div class="board-card">
                <div class="the-card">
                    <a href="/todo"> <img class="board-img" src="../assets/space.jpg" alt="" style=""></a>
                    <h3 class="board-title">To Do Board 💫</h3>
                </div>

            </div>
            <div class="board-card">
                <div class="the-card">
                    <a href="#"> <img class="board-img" src="../assets/830-15.jpg" alt="" style=""></a>
                    <h3 class="board-title">April</h3>
                </div>
                <div class="text-box"></div>
            </div>
            <div class="board-card">
                <button class="create-board-btn">Create a new board</button>
            </div>
        </div>
    </div>

</template>

<script setup>

</script>


<style scoped>
.board {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%
}

.board-content {
    display: flex;
    flex-direction: row;
}

.board-card {
    display: flex;
    flex-direction: column;
    margin-left: 25px;
}

.the-card {
    width: 300px;
    height: 200px;
    background: #f0f0f01c;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}

.create-board-btn {
    background: #f0f0f01c;
    color: white;
    height: 200px;
}

.board-title {
    margin: 0;
}

.board-img {
    width: 300px;
    height: 160px;
    border-radius: 10px 10px 0 0;
    opacity: 60%;
}
</style>