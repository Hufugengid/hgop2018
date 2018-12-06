node {
    def git = checkout scm

    stage("clean"){
    sh "git clean -dfxq"
    sh "git stash"
    }
    stage("setup"){
    sh "npm install --prefix game-api"
    }
    stage("lint"){
   	sh "npm run eslint --prefix game-api"
    }
    stage("test"){
    sh "npm run test:unit --prefix game-api"
    }
    stage("Build"){
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
    build job: 'freestyle-hufugengi', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]
}
