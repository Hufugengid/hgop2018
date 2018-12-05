node {
    def git = checkout scm
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
    stage("clean"){
	sh "git clean -dfxq"
	sh "git stash"
    	sh "npm install --prefix game-api"
   	sh "npm run eslint --prefix game-api"
 }
}
