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
    step([
    $class: 'CloverPublisher',
    cloverReportDir: 'coverage',
    cloverReportFileName: 'clover.xml',
    healthyTarget: [methodCoverage: 80, conditionalCoverage: 80, statementCoverage: 80],
    unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50],
    failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
    ])
    }
    stage("Build"){
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
    build job: 'freestyle-hufugengi', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]
}
