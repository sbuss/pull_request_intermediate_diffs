// ==UserScript==
// @name          Pull Request Diffs
// @namespace     http://github.com/sbuss/
// @description	  An easy way to view intermediate diffs in a pull request.
// @include       http://github*/*
// @include       https://github*/*
// @include       http://*.github*/*
// @include       https://*.github*/*
// ==/UserScript==


function main() {
    getCommitAnchors();

    function getCommitAnchors() {
        //var commits = document.getElementsByClassName("td.commit")
        var commits = $('td.commit')
        //console.log(commits)
        for (var i = 0; i < commits.length; i++) {
            anchor = commits[i].getElementsByTagName("a")[0]

            var radio1 = document.createElement("input")
            radio1.type = "radio"
            radio1.name = "start_compare"
            radio1.value = anchor.innerHTML

            var radio2 = document.createElement("input")
            radio2.type = "radio"
            radio2.name = "end_compare"
            radio2.value = anchor.innerHTML

            c = commits[i]
            //console.log(c)
            c.insertBefore(radio2, commits[i].childNodes[1])
            c.insertBefore(radio1, commits[i].childNodes[1])
        }

        div = document.createElement("div")
        div.style.position = "fixed"
        div.style.top = "0"
        div.style.left = "0"
        div.style.display = "block"
        div.style.zIndex = "1000"
        div.style.padding = "5px"
        compare_link = document.createElement("a")
        compare_link.href = "javascript:compare()"
        compare_link.innerHTML = "Compare selected commits"
        div.appendChild(compare_link)
        document.getElementsByTagName('body')[0].appendChild(div)
    }

    function getSelectedRadio(group) {
        if (group[0]) {
            for (var i = 0; i < group.length; i++) {
                if (group[i].checked) {
                    return group[i]
                }
            }
        } else {
            if (group.checked) {
                return group
            }
        }
        return null
    }

    window.compare = function() {
        radio1 = getSelectedRadio(document.getElementsByName("start_compare"))
        radio2 = getSelectedRadio(document.getElementsByName("end_compare"))
        if (radio1 != null && radio2 != null) {
            window.location = "/dev/website/compare/" + radio1.value + "..." + radio2.value
        }
    }
}

// So the compare function can be referenced in chrome
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);

