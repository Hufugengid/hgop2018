node {
    def git = checkout scm

    stage("clean"){
    sh "git clean -dfxq"
    sh "git stash"
    }
    stage("npm"){
    sh "npm install --prefix game-api"
    }
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
    stage("lint"){
   	sh "npm run eslint --prefix game-api"
 }
}
