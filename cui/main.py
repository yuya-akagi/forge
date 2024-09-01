import sys
import os

job_dir = "/job"
# ファイルを作成
f = open(os.path.join(job_dir,sys.argv[1]), 'w')
f.write('')
f.close()
